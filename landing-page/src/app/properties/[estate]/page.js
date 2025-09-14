"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaLandmark } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Header from "@/components/websites/header/header";

const ITEMS_PER_PAGE = 4;

const EstatePage = () => {
  const { estate } = useParams();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProperties = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/property/?category=${category}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProperties(data.data); // Accessing the properties directly from the response data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(estate); // Fetch properties based on the estate category
  }, [estate]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray">
      <Header />
      <div className="container mx-auto px-4 pb-8 ">
        {currentItems.map((datum) => (
          <div
            key={datum.id}
            className="flex flex-col gap-2 md:gap-4 px-2 py-4 md:py-6 lg:px-2 lg:py-8 xl:px-6"
          >
            <div className="shadow-2xl bg-white rounded-xl flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="flex items-center justify-center h-full md:h-[30vh] lg:h-[40vh] xl:h-[30vh]">
                  {/* Assuming propertyImages is an array of image URLs */}
                  <Image
                    src={
                      datum.propertyImages[0]
                        ? datum.propertyImages[0].image
                        : "/fallback-image.jpg"
                    }
                    width={"400"}
                    height={"400"}
                    alt="pic-img"
                    className="w-full h-full object-cover lg:rounded-l-xl"
                  />
                </div>
              </div>
              <div className="flex-2 flex flex-col gap-2 justify-center px-5 pt-4 pb-5 md:pb-10 lg:pb-0 md:px-6 lg:px-5">
                <div className="flex flex-col gap-4">
                  <p className="text-xs md:text-lg lg:text-sm font-medium">
                    {datum.title}
                  </p>
                  <p className="text-xs md:text-lg lg:text-sm leading-5 font-light">
                    {datum.body}
                  </p>
                  <div className="flex items-center gap-1 md:gap-1 lg:gap-2">
                    <IoLocationSharp className="text-orange h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
                    <p className="text-xs md:text-lg lg:text-sm font-light">
                      {datum.address},
                    </p>
                  </div>
                  <div className="flex items-center gap-2 md:gap-2 lg:gap-2">
                    <FaLandmark className="text-orange h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
                    <p className="text-xs md:text-lg lg:text-sm leading-5 font-light">
                      {datum.land_space} sqft
                    </p>
                  </div>
                  <p className="text-xs md:text-lg lg:text-sm font-medium">{`Price: ₦${datum.amount.toLocaleString()}`}</p>
                  <Link key={datum.id} href={`/singleproperty/${datum.slug}`}>
                    <button className="flex justify-center items-center px-8 py-2 gap-4 border bg-lite text-white text-xs md:text-lg lg:text-sm">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-2 md:gap-4 pt-10 pb-5 md:pt-16 lg:pt-20 xl:pt-24">
          <button
            className="gap-2 p-2 flex justify-center items-center shadow-2xl bg-white h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowRoundBack className="h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                className={`gap-2 p-2 flex justify-center items-center shadow-2xl h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100 ${
                  number === currentPage ? "bg-lite text-fad" : ""
                }`}
                onClick={() => paginate(number)}
              >
                <span className="text-xs md:text-lg lg:text-sm">{number}</span>
              </button>
            )
          )}
          <button
            className="gap-2 p-2 flex justify-center items-center shadow-2xl bg-white h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowRoundForward className="h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstatePage;
