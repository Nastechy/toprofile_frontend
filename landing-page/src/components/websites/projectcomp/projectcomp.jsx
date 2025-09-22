"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { URL } from "@/components/utils/client";
import { getTokenTOLocalStorage } from "@/components/utils/storage";

const ITEMS_PER_PAGE = 6;

/** Map backend category id -> human label */
const categoryLabel = (cat) => {
  const id =
    typeof cat === "object" && cat !== null
      ? Number(cat?.id ?? cat?.value ?? cat)
      : Number(cat);
  switch (id) {
    case 1:
      return "Land";
    case 2:
      return "Houses";
    default:
      return "Other";
  }
};

/** Format NGN amounts if numeric, otherwise show raw */
const formatAmount = (val) => {
  const n = Number(val);
  if (!isNaN(n)) {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `₦${n.toLocaleString()}`;
    }
  }
  return val ?? "";
};

const Projectcomp = () => {
  const [token, setToken] = useState(null);

  // Listing (API-driven)
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // UI state
  const [loading, setLoading] = useState(true); // start true so we never flash "No property available" before data
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Gallery state
  const [activeImg, setActiveImg] = useState(0);
  const images = (selectedProperty?.propertyImages ?? [])
    .map((i) => (typeof i === "string" ? i : i?.url))
    .filter(Boolean);
  const mainImg = images[activeImg] ?? "/placeholder.png";
  const onPrevImg = () =>
    setActiveImg((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
  const onNextImg = () =>
    setActiveImg((i) => (i + 1) % Math.max(images.length, 1));

  useEffect(() => {
    setToken(getTokenTOLocalStorage() ?? null);
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(
        `${URL}/property/?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      if (!resp.ok) throw new Error("Failed to fetch properties");
      const json = await resp.json();

      const data = json?.data ?? [];
      const meta = json?.meta_data ?? {};

      setProperties(data);
      setTotalPages(meta.total_page ?? 1);
      setTotalEntries(meta.total ?? data.length);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, token]);

  // Client-side search on current page
  const filteredItems = useMemo(() => {
    if (!searchTerm) return properties;
    const q = searchTerm.toLowerCase();
    return properties.filter((p) =>
      `${p?.title ?? ""} ${p?.body ?? ""}`.toLowerCase().includes(q)
    );
  }, [properties, searchTerm]);

  const paginate = (pageNumber) => {
    const next = Math.min(Math.max(pageNumber, 1), totalPages);
    if (next !== currentPage) {
      setCurrentPage(next);
      if (typeof window !== "undefined") window.scrollTo(0, 0);
    }
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedProperty(null);
    setModalError(null);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (!showModal) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft" && images.length > 1) onPrevImg();
      if (e.key === "ArrowRight" && images.length > 1) onNextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal, closeModal, images.length]);

  // Lock body scroll while modal is open (mobile UX)
  useEffect(() => {
    if (showModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showModal]);

  const tryShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = selectedProperty?.title ?? "Property";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      }
    } catch {
      // ignore cancellation
    }
  };

  const openModalWithProperty = async (fallbackItem) => {
    setModalError(null);
    setModalLoading(true);
    setShowModal(true);
    setActiveImg(0);

    const slug = fallbackItem?.slug;
    if (!slug) {
      setSelectedProperty(fallbackItem);
      setModalLoading(false);
      return;
    }

    try {
      const resp = await fetch(`${URL}/property/${slug}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!resp.ok) {
        setSelectedProperty(fallbackItem);
      } else {
        const detail = await resp.json();
        const data = detail?.data ?? detail;
        setSelectedProperty({ ...fallbackItem, ...data });
      }
    } catch (e) {
      console.error(e);
      setSelectedProperty(fallbackItem);
      setModalError("Could not load full details.");
    } finally {
      setModalLoading(false);
    }
  };

  const hasBackendData = properties.length > 0;
  const isSearching = Boolean(searchTerm);

  return (
    <div className="bg-gray">
      {/* Search */}
      <div className="flex items-center justify-center relative">
        <div className="bg-white w-[80%] lg:w-[50%] rounded-2xl p-10 md:p-20 lg:p-10 xl:p-16 flex flex-col gap-4 absolute top-[-4rem] md:top-[-13rem] lg:top-[-5rem] xl:top-[-8rem]">
          <Formik
            initialValues={{ searchTerm: "" }}
            validationSchema={Yup.object({
              searchTerm: Yup.string().nullable(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSearchTerm(values.searchTerm || "");
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col gap-3 md:gap-4">
              <p className="text-sm md:text-2xl lg:text-base xl:text-lg ">Search:</p>
              <div className="bg-gray flex items-center px-3 py-2 md:py-4 md:px-5 lg:px-3 lg:py-3 gap-2">
                <AiOutlineSearch className="text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6" />
                <Field
                  type="text"
                  name="searchTerm"
                  placeholder="Search For Property"
                  className="text-xs md:text-xl lg:text-sm xl:text-base bg-transparent outline-none w-full"
                />
              </div>
              <ErrorMessage
                name="searchTerm"
                component="div"
                className="text-red-600 text-xs md:text-xl lg:text-sm"
              />
              <button
                type="submit"
                className="bg-orange text-white text-xs md:text-2xl lg:text-base xl:text-lg w-[40%] lg:w-[30%] px-4 py-1 md:py-3 lg:py-2"
              >
                Search
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-gray-200 pt-[11rem] pb-10 px-5 md:px-10 md:pt-[14rem] lg:pt-[14rem] xl:pt-[15rem] lg:px-10 xl:px-12 ">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8 lg:gap-5">
          {loading ? (
            <div className="col-span-full text-center text-slate-600">Loading…</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-600">{error}</div>
          ) : !hasBackendData ? (
            // Only show this when the backend actually returned zero items
            <div className="col-span-full text-center text-slate-600">
              No property available
            </div>
          ) : filteredItems.length === 0 && isSearching ? (
            // Distinct message when search filters to no results
            <div className="col-span-full text-center text-slate-600">
              No results for your search
            </div>
          ) : (
            filteredItems.map((datum) => {
              const imgSrc =
                (datum?.propertyImages?.[0] &&
                  (typeof datum.propertyImages[0] === "string"
                    ? datum.propertyImages[0]
                    : datum.propertyImages[0]?.url)) ||
                "/placeholder.png";
              const title = datum?.title ?? "Untitled Property";
              const desc = datum?.body ?? "";
              const amount = datum?.amount ?? datum?.price ?? null; // support either field

              return (
                <div
                  className="group hover:shadow-2xl shadow-slate-500 bg-white rounded-xl overflow-hidden transition"
                  key={datum?.slug || title}
                >
                  {/* Image */}
                  <div className="h-48 w-full relative">
                    <Image
                      src={imgSrc}
                      alt={title}
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="px-5 pt-4 md:px-4 lg:px-5">
                    {/* Title + category */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm md:text-lg font-medium line-clamp-2">
                        {title}
                      </p>
                      <span className="shrink-0 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] md:text-xs text-slate-700">
                        {categoryLabel(datum?.category)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm leading-5 text-slate-600 mt-2 line-clamp-3">
                      {desc}
                    </p>

                    <div className="border-gray border-b-[1px] mt-3" />
                  </div>

                  {/* Footer: Price + Land Space + Button */}
                  <div className="px-5 pb-4 pt-3 md:px-4 lg:px-5">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="flex flex-col">
                        {amount && (
                          <p className="text-sm md:text-base font-semibold text-slate-800 truncate">
                            {formatAmount(amount)}
                          </p>
                        )}
                        {datum?.land_space && (
                          <p className="text-[11px] md:text-xs text-slate-500">
                            Land Space: {datum.land_space}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => openModalWithProperty(datum)}
                        className="ml-auto bg-orange text-white rounded-md text-[11px] md:text-sm px-4 py-2 hover:opacity-95 active:opacity-90 transition"
                      >
                        VIEW PROPERTY
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 md:gap-4 pt-10 pb-5 md:pt-16 lg:pt-20 xl:pt-[24rem] cursor-pointer">
          <div
            className="p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 rounded-full border"
            onClick={() => paginate(currentPage - 1)}
          >
            <IoIosArrowBack />
          </div>
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index + 1}
              className={`p-2 flex justify-center items-center shadow-2xl h-8 w-8 rounded-full border ${
                currentPage === index + 1 ? "bg-lite text-fad" : "bg-white text-black"
              }`}
              onClick={() => paginate(index + 1)}
            >
              <p className="text-xs">{index + 1}</p>
            </div>
          ))}
          <div
            className="p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 rounded-full border"
            onClick={() => paginate(currentPage + 1)}
          >
            <IoIosArrowForward />
          </div>
        </div>

        {/* Showing info */}
        <div className="text-center text-slate-500 text-sm">
          Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalEntries)} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, totalEntries)} of {totalEntries} entries
        </div>
      </div>

      {/* Modal: compact on small, split on lg */}
      {showModal && (
        <div
          className="
            fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]
            flex items-center justify-center
            p-3 lg:p-6
          "
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="
              w-full max-w-md lg:max-w-6xl mt-20
              bg-white
              rounded-2xl
              shadow-2xl
              overflow-hidden
              max-h-[85vh] lg:max-h-[85vh]
              flex flex-col
            "
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b bg-white/90 backdrop-blur">
              <div className="min-w-0 pr-2">
                <h3 className="truncate font-semibold text-base lg:text-lg">
                  {selectedProperty?.title ?? "Property"}
                </h3>
                <p className="text-xs text-slate-500 truncate">
                  {selectedProperty?.address ?? ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={tryShare}
                  className="px-3 py-2 text-sm rounded-md border hover:bg-slate-50 active:bg-slate-100"
                  title="Share / Copy link"
                >
                  Share
                </button>
                <button
                  onClick={closeModal}
                  className="h-9 w-9 grid place-items-center rounded-md border hover:bg-slate-50 active:bg-slate-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content (scrollable) */}
            <div className="overflow-y-auto">
              {/* Small screens: stacked; Large: split grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-6">
                {/* LEFT / TOP: Gallery */}
                <div className="lg:col-span-3">
                  <div className="relative w-full h-56 sm:h-64 lg:h-[420px] bg-slate-100">
                    {modalLoading ? (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        Loading…
                      </div>
                    ) : (
                      <Image
                        src={mainImg}
                        alt={selectedProperty?.title ?? "property"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}

                    {/* Arrows (hide if <2 images) */}
                    {!modalLoading && images.length > 1 && (
                      <>
                        <button
                          onClick={onPrevImg}
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow grid place-items-center"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          onClick={onNextImg}
                          className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow grid place-items-center"
                          aria-label="Next image"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails (compact on small) */}
                  {!modalLoading && images.length > 1 && (
                    <div className="flex gap-2 p-3 overflow-x-auto border-t">
                      {images.map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          className={`relative h-14 w-20 shrink-0 rounded overflow-hidden border ${
                            idx === activeImg
                              ? "ring-2 ring-lite border-transparent"
                              : "hover:opacity-90"
                          }`}
                          aria-label={`Image ${idx + 1}`}
                        >
                          <Image
                            src={src}
                            alt={`thumb-${idx}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT / BOTTOM: Details */}
                <div className="lg:col-span-2 p-4 lg:p-6 space-y-5">
                  {/* Price + badges */}
                  <div className="space-y-2">
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold">
                      {formatAmount(
                        selectedProperty?.amount ?? selectedProperty?.price ?? "—"
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty?.category !== undefined && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {categoryLabel(selectedProperty?.category)}
                        </span>
                      )}
                      {selectedProperty?.status && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-medium">
                          {selectedProperty.status}
                        </span>
                      )}
                      {selectedProperty?.land_space && (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          Land Space: {selectedProperty.land_space}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Facts grid (compact) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {selectedProperty?.address && (
                      <div className="rounded-lg border p-3">
                        <p className="text-slate-500">Address</p>
                        <p className="font-medium">{selectedProperty.address}</p>
                      </div>
                    )}
                    {typeof selectedProperty?.land_space !== "undefined" && (
                      <div className="rounded-lg border p-3">
                        <p className="text-slate-500">Land Space</p>
                        <p className="font-medium">{selectedProperty.land_space}</p>
                      </div>
                    )}
                    {selectedProperty?.bedrooms && (
                      <div className="rounded-lg border p-3">
                        <p className="text-slate-500">Bedrooms</p>
                        <p className="font-medium">{selectedProperty.bedrooms}</p>
                      </div>
                    )}
                    {selectedProperty?.bathrooms && (
                      <div className="rounded-lg border p-3">
                        <p className="text-slate-500">Bathrooms</p>
                        <p className="font-medium">{selectedProperty.bathrooms}</p>
                      </div>
                    )}
                    {selectedProperty?.sqr || selectedProperty?.area ? (
                      <div className="rounded-lg border p-3">
                        <p className="text-slate-500">Area</p>
                        <p className="font-medium">
                          {selectedProperty.sqr ?? selectedProperty.area}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {/* Description (compact) */}
                  <div className="space-y-2">
                    <p className="text-slate-500 text-sm">Description</p>
                    <div className="rounded-xl border p-4 text-sm leading-6 text-slate-700 whitespace-pre-line">
                      {modalLoading
                        ? "Loading description…"
                        : selectedProperty?.body ?? "No description provided."}
                    </div>
                    {modalError && (
                      <div className="text-xs text-red-600">{modalError}</div>
                    )}
                  </div>

                  {/* Quick actions (inline, compact) */}
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={async () => {
                        const url =
                          typeof window !== "undefined" ? window.location.href : "";
                        try {
                          if (navigator.clipboard) {
                            await navigator.clipboard.writeText(url);
                            alert("Link copied to clipboard");
                          }
                        } catch {}
                      }}
                      className="px-3 py-2 text-sm rounded-md border hover:bg-slate-50"
                    >
                      Copy link
                    </button>
                    <button
                      className="px-3 py-2 text-sm rounded-md bg-orange text-white hover:opacity-90"
                      onClick={() => {
                        const phone = "2347060679005"; // agent/business number
                        const message = `Hello, I'm interested in the property: ${
                          selectedProperty?.title ?? "Property"
                        } located at ${selectedProperty?.address ?? ""}. Could you give me more details?`;
                        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
                          message
                        )}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 lg:px-6 py-3 border-t bg-white flex justify-end">
              <button
                className="px-4 py-2 rounded-md border hover:bg-slate-50 text-sm"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projectcomp;
