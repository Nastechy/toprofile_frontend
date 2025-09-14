"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import multi from "../../../../public/img/six.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Blogsnews = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10; // Define how many posts you want per page

  const fetchBlogs = async (page) => {
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/blog/?page=${page}&per_page=${postsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBlogs(data.data);
      setTotalPages(data.meta_data.total_page); // Update total pages
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
    AOS.init();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className="bg-gray"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
    >
      <div className="bg-gray-200 px-10 py-10 md:py-16 lg:px-20 xl:px-30">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p></p>
          ) : (
            blogs.map((datum) => (
              <div
                key={datum.id}
                className="shadow-2xl flex flex-col gap-2 md:gap-4 bg-white"
              >
                <Image
                  src={datum.image}
                  alt="pic-img"
                  width={600}
                  height={200}
                  className="rounded-xl"
                />
                <div className="px-10 md:px-10 lg:px-10 xl:px-5">
                  <p className="text-xs md:text-lg lg:text-sm xl:text-base text-brw">{`${datum.reading_time} mins`}</p>
                </div>
                <div className="px-5 md:px-5 lg:px-5">
                  <p className="text-xs md:text-xl lg:text-lg xl:text-xl text-slate-600">
                    {datum.title}
                  </p>
                </div>
                <Link
                  href={`/singleblog/${datum.slug}`}
                  className="px-5 md:px-5 lg:px-5"
                >
                  <p className="text-xs md:text-lg lg:text-sm xl:text-base text-lite">
                    Read More...
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4 pt-10 pb-5 md:pt-16 lg:pt-20 xl:pt-24">
          <div
            className={`gap-2 p-2 flex justify-center items-center shadow-2xl bg-white h-8 w-8 rounded-full border border-slate-100 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <IoIosArrowBack className="h-5 w-5" />
          </div>
          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`gap-2 p-2 flex justify-center items-center shadow-2xl bg-white h-8 w-8 rounded-full border border-slate-100 ${
                currentPage === index + 1 ? "bg-gray-300" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              <p className="text-xs md:text-xl lg:text-sm xl:text-base">
                {index + 1}
              </p>
            </div>
          ))}
          <div
            className={`gap-2 p-2 flex justify-center items-center shadow-2xl bg-white h-8 w-8 rounded-full border border-slate-100 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <IoIosArrowForward className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogsnews;
