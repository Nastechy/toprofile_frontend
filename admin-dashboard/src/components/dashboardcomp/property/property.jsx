"use client";

import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import axios from "axios";

import CreateProperty from "./CreateProperty/createproperty";
import UpdateProperty from "./updateProperty/updateproperty";
import CreatePropertyCategory from "./Category/createPropertyCategory";

import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

const itemsPerPage = 10;

function truncate(description, maxLength) {
  if (description && description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description ?? "";
}

export default function Property() {
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [token, setToken] = useState(null);

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(getTokenTOLocalStorage() ?? null);
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/property/`, {
        params: { page: currentPage, per_page: itemsPerPage },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const data = response?.data?.data ?? [];
      const meta = response?.data?.meta_data ?? {};

      setProperties(data);
      setTotalPages(meta.total_page ?? 0);
      setTotalEntries(meta.total ?? 0);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page or token changes
  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, token]);

  const handleCreatePropertyClick = () => setShowModal((s) => !s);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteProperty = async (propertySlug) => {
    if (!token) {
      console.error("No token found, please log in");
      return;
    }
    try {
      const resp = await fetch(`${URL}/property/${propertySlug}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) throw new Error("Failed to delete the property");
      fetchProperties();
    } catch (e) {
      console.error("Error deleting property:", e);
      setError(e.message);
    }
  };

  const handleEditClick = (propertySlug) => {
    setSelectedProperty(propertySlug);
    setShowPropertyModal(true);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-end items-center gap-3 px-10 lg:py-10 xl:px-16 xl:py-10">
        <button
          className="bg-lite px-3 py-2 text-[12px] font-semibold text-white flex justify-center items-center gap-2 rounded-md"
          onClick={handleCreatePropertyClick}
        >
          <MdAdd className="h-4 w-4 font-semibold" />
          Create Property
        </button>
        <button
          className="bg-lite px-3 py-2 text-[12px] font-semibold text-white flex justify-center items-center gap-2 rounded-md"
          onClick={() => setShowCategoryModal(true)}
        >
          <MdAdd className="h-4 w-4 font-semibold" />
          Create Category
        </button>
      </div>

      <div className="px-10 xl:px-16">
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="min-w-full table-auto text-sm xl:text-base">
            <thead className="bg-slate-50 h-[7vh]">
              <tr>
                <th className="text-left px-4 py-3 w-[80px]">S/N</th>
                <th className="text-left px-4 py-3 w-[120px]">Image</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Description</th>
                <th className="text-center px-4 py-3 w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              ) : properties.length > 0 ? (
                properties.map((datum, idx) => {
                  const imgSrc = datum?.propertyImages?.[0]?.url || "/placeholder.png";
                  return (
                    <tr
                      key={datum?.id ?? datum?.slug ?? idx}
                      className="border-t"
                    >
                      <td className="px-4 py-3">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Image
                            src={imgSrc}
                            alt="property"
                            width={60}
                            height={60}
                            className="w-[60px] h-[60px] object-cover rounded"
                            unoptimized
                          />
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-xs">{truncate(datum?.title, 40)}</p>
                      </td>

                      <td className="px-4 py-3">
                        <p className="text-xs">{truncate(datum?.body, 80)}</p>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditClick(datum?.slug)}
                            title="Edit"
                            className="p-2 rounded hover:bg-slate-100"
                          >
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProperty(datum?.slug)}
                            title="Delete"
                            className="p-2 rounded hover:bg-red-50"
                          >
                            <MdDeleteOutline className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    {error ?? "No property available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Pagination */}
      <div className="flex justify-between items-center px-5 pt-[300px] pb-10">
        <div>
          <p className="text-sm text-slate-500">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} to{" "}
            {Math.min(currentPage * itemsPerPage, totalEntries)} of{" "}
            {totalEntries} entries
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 text-slate-500 text-sm">
          <div
            className={`flex items-center font-medium gap-1 rounded-md border border-slate-300 p-2 ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <IoIosArrowRoundBack className="h-4 w-4" />
            <p className="text-sm">Previous</p>
          </div>

          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`border border-slate-300 px-4 py-2 ${currentPage === index + 1
                ? "bg-lite text-white"
                : "hover:bg-lite hover:text-white"
                } cursor-pointer`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <p className="text-sm">{index + 1}</p>
            </div>
          ))}

          <div
            className={`flex items-center gap-1 font-medium border rounded-md border-slate-300 p-2 ${currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
          >
            <p className="text-sm">Next</p>
            <IoIosArrowRoundForward className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] top-6 left-[8rem] xl:left-[9rem] xl:top-[1.5rem] h-[80vh] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <CreateProperty
              fetchProperties={fetchProperties}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] top-6 left-[8rem] xl:left-[9rem] xl:top-[1.5rem] h-[80vh] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <CreatePropertyCategory
              fetchProperties={fetchProperties}
              // pass a function, not an immediate call

              handleCloseModal={() => setShowCategoryModal(false)}
            />
          </div>
        </div>
      )}

      {showPropertyModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <UpdateProperty
              propertySlug={selectedProperty}
              handleCloseModal={() => setShowPropertyModal(false)}
              fetchProperties={fetchProperties}
            />
          </div>
        </div>
      )}
    </div>
  );
}
