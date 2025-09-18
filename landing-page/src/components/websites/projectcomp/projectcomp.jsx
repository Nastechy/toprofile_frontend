// "use client"
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image'
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import multi from '../../../../public/img/multi.png'
// import dem from '../../../../public/img/dem.jpg'
// import win from '../../../../public/img/win.jpeg'
// import wm from '../../../../public/img/wm.jpeg'
// import rck from '../../../../public/img/rck.jpeg'
// import bd from '../../../../public/img/bd.jpg'
// import eden from '../../../../public/img/eden.jpg'
// import nnfo from '../../../../public/img/nnw4.jpeg'
// import nnf from '../../../../public/img/nnw5.jpeg'
// import dp from '../../../../public/img/dp.jpg'
// import { LuBedDouble, LuBath } from "react-icons/lu";
// import { FaLandmark } from 'react-icons/fa';
// import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
// import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai';
// import { BsHouse } from "react-icons/bs";
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useParams } from 'next/navigation';


// const Projectcomp = () => {

//     const router = useRouter(); // No need to useState for router

//     const details = [
//         // {
//         //     id: 1,
//         //     pic: win,
//         //     label: "WINGATE ESTATE KUJE ABUJA",
//         //     text: "4 BEDROOMS TERRACE DUPLEX",
//         //     sqr: "250 SQM",
//         //     price: "₦1,200,000.00",
//         // },
//         {
//             id: 1,
//             pic: nnfo,
//             label: "DYNASTY CITY GUZAPE 2 ABUJA",
//             text: "5 BEDROOMS FULLY DETACHED DUPLEX WITH DETACHED BQ",
//             sqr: "600 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 2,
//             pic: wm,
//             label: "WEMBLEY CITY JIKWOYI ABUJA",
//             text: "2 BEDROOMS TERRACE DUPLEX",
//             sqr: "180 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 3,
//             pic: eden,
//             label: "EDENLAND KURUDU ABUJA",
//             text: "2 BEDROOMS TERRACE DUPLEX WITH ATTACHED BQ",
//             sqr: "180 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 4,
//             pic: dem,
//             label: "DOUBLE KING VILLA GUZAPE 2 ABUJA",
//             text: "4 BEDROOMS SEMI-DETACHED PENTHOUSE",
//             sqr: "350 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 5,
//             pic: dem,
//             label: "DOUBLE KING LEISURE VIEW ESTATE ABUJA",
//             text: "4 BEDROOM TERRACE DUPLEX",
//             sqr: "250 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 6,
//             pic: rck,
//             label: "ROYALHILLS ESTATE ASOKORO EXTENSION ABUJA",
//             text: "2 BEDROOMS TERRACE DUPLEX WITH AN ATTACHED BQ",
//             sqr: "300 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 7,
//             pic: dp,
//             label: "TREASURELAND ESTATE JIKWOYI ABUJA",
//             text: "2 BEDROOMS TERRACE DUPLEX WITH ATTACHED BQ",
//             sqr: "180 SQM",
//             price: "₦1,200,000.00",
//         },
//         {
//             id: 8,
//             pic: bd,
//             label: "NEFT COURT IDU ABUJA",
//             text: "4 BEDROOMS TERRACE DUPLEX WITH ATTACHED BQ",
//             sqr: "250 SQM",
//             price: "₦1,200,000.00",
//         },
//         // {
//         //     id: 9,
//         //     pic: nnfo,
//         //     label: "DYNASTY CITY GUZAPE 2 ABUJA",
//         //     text: "5 BEDROOMS FULLY DETACHED DUPLEX WITH DETACHED BQ",
//         //     sqr: "600 SQM",
//         //     price: "₦1,200,000.00",
//         // },
//         {
//             id: 10,
//             pic: nnf,
//             label: "VELVET VILLA ASOKORO EXT ABUJA",
//             text: "5 BEDROOMS TERRACE DUPLEX",
//             sqr: "250 SQM",
//             price: "₦1,200,000.00",
//         },

//     ];

//     const handleSearch = (values, { setSubmitting }) => {
//         // Handle search logic here
//         console.log('Searching for:', values.searchTerm);
//         setSubmitting(false);
//     };

//     const ITEMS_PER_PAGE = 6;
//     const property = { items: details }; // Assuming you want to paginate over `details`


//     const [currentPage, setCurrentPage] = useState(1);
//     const [loading, setLoading] = useState(false);



//     const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//     const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//     const currentItems = property ? property.items.slice(indexOfFirstItem, indexOfLastItem) : [];

//     const totalPages = property ? Math.ceil(property.items.length / ITEMS_PER_PAGE) : 1;

//     const paginate = (pageNumber) => {
//         setLoading(true);
//         setTimeout(() => {
//             setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
//             setLoading(false);
//         }, 1000);
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [currentPage]);

//     if (!property) {
//         return <div>Property not found</div>;
//     }






//     return (
//         <div className='bg-gray'>
//             <div className='flex items-center justify-center relative'>
//                 <div className='bg-white w-[80%] lg:w-[50%]  rounded-2xl p-10 md:p-20 lg:p-10 xl:p-16 flex flex-col gap-4 absolute top-[-4rem] md:top-[-13rem] lg:top-[-5rem] xl:top-[-8rem]'>

//                     <Formik
//                         initialValues={{ searchTerm: '' }}
//                         validationSchema={Yup.object({
//                             searchTerm: Yup.string().required('Search term is required')
//                         })}
//                         onSubmit={handleSearch}
//                     >
//                         <Form className='flex flex-col gap-3 md:gap-4'>
//                             <p className='text-sm md:text-2xl lg:text-base xl:text-lg '>Search:</p>
//                             <div className='bg-gray flex items-center px-3 py-2 md:py-4 md:px-5 lg:px-3 lg:py-3 gap-2'>
//                                 <AiOutlineSearch className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6' />
//                                 <Field
//                                     type="text"
//                                     name="searchTerm"
//                                     placeholder="Search For Property"
//                                     className='text-xs md:text-xl lg:text-sm xl:text-base bg-transparent outline-none'
//                                 />
//                             </div>
//                             <ErrorMessage name="searchTerm" component="div" className="text-red-600 text-xs md:text-xl lg:text-sm" />

//                             <button type="submit" className='bg-orange text-white text-xs md:text-2xl lg:text-base xl:text-lg w-[40%] lg:w-[30%]  px-4 py-1 md:py-3 lg:py-2'>Search</button>
//                         </Form>
//                     </Formik>
//                 </div>

//             </div>




//             <div className='bg-gray-200 pt-[11rem] pb-10  px-5 md:px-10 md:pt-[14rem] lg:pt-[14rem] xl:pt-[15rem] lg:px-10 xl:px-12 '>

//                 <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8 lg:gap-5'>
//                     {
//                         currentItems.map((datum) => (
//                             <div className='hover:shadow-2xl shadow-slate-500 ' key={datum.id}>
//                                 <div className=' hover:bg-fad flex flex-col gap-2 md:gap-4 px-4 py-4 md:py-6 lg:px-6 lg:py-8 shadow-2xl shadow-slate-400'>

//                                     <div className='bg-white pb-3 md:pb-6 lg:pb-4 rounded-t-xl'>
//                                         <div className='h-48 w-full'>
//                                             <Image src={datum.pic} alt='pic-img' className='rounded-t-xl' style={{ width: '100%', height: '100%' }} />
//                                         </div>

//                                         <div className='px-5 pt-4 md:px-2 lg:px-5 flex flex-col justify-between items-stretch'>
//                                             <p className='text-xs md:text-lg lg:text-sm font-medium flex-grow'>
//                                                 {datum.label}
//                                             </p>
//                                             <div className='border-gray border-b-[1px] mt-2 md:mt-2 lg:mt-1'></div>
//                                         </div>


//                                         <div className='px-5 pt-2 md:px-2 lg:px-5 '>

//                                             <div className='flex items-stretch '>
//                                                 <p className=' text-xs md:text-lg lg:text-sm leading-5 font-light flex-grow'>{datum.text}</p>

//                                             </div>
//                                             <div className='border-gray border-b-[1px] mt-2 md:mt-5 lg:mt-2'></div>

//                                         </div>

//                                         <div className='px-5 pt-2 md:px-2 lg:px-5 '>

//                                             <div className=' flex items-center justify-between gap-2 md:gap-2 lg:gap-2'>
//                                                 <div className='flex items-center gap-1 md:gap-1 lg:gap-2'>
//                                                     <FaLandmark className='text-orange h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5' />
//                                                     <p className=' text-xs md:text-lg lg:text-sm  leading-5 font-light'>{datum.sqr}</p>
//                                                 </div>

//                                             </div>
//                                             <div className='border-gray border-b-[1px] mt-2 md:mt-5'></div>
//                                             <Link href={`/properties/${datum.label.replace(/ /g, '-').toLowerCase()}`} className='hover:bg-lite' >
//                                                 <div className=' flex items-center justify-between gap-2 md:gap-2 lg:gap-2 pt-3'>
//                                                     <button className='flex justify-center items-center gap-4 border bg-orange text-white text-xs md:text-lg  lg:text-sm px-6 py-2 md:py-2 lg:py-2' >
//                                                         VIEW PROPERTY
//                                                     </button>

//                                                 </div>
//                                             </Link>



//                                         </div>



//                                         {/* <div className='pb-2 md:pb-5 px-5 flex flex-col gap-1 md:gap-2 '>
//  <p className='text-slate-400 text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light'>Price</p>
//  <p className=' text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light'>{datum.price}</p>
// </div> */}
//                                     </div>

//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>




//                 {/* Pagination Controls */}
//                 <div className='flex items-center justify-center gap-2 md:gap-4 pt-10 pb-5 md:pt-16 lg:pt-20 xl:pt-[24rem] cursor-pointer'>
//                     <div
//                         className='gap-2 p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100'
//                         onClick={() => paginate(currentPage - 1)}
//                     >
//                         <IoIosArrowBack className='h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8' />
//                     </div>

//                     {[...Array(totalPages)].map((_, index) => (
//                         <div
//                             key={index + 1}
//                             className={`gap-2 p-2 flex justify-center items-center shadow-2xl h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100 ${currentPage === index + 1 ? 'bg-lite text-fad ' : 'bg-white text-black '}`}
//                             onClick={() => paginate(index + 1)}
//                         >
//                             <p className='text-xs md:text-xl lg:text-sm xl:text-base'>{index + 1}</p>
//                         </div>
//                     ))}

//                     <div
//                         className='gap-2 p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100'
//                         onClick={() => paginate(currentPage + 1)}
//                     >
//                         <IoIosArrowForward className='h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Projectcomp












"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { FaLandmark } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// bring in your helpers
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

const ITEMS_PER_PAGE = 6;

const Projectcomp = () => {
  const router = useRouter();

  // API data & meta
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  // UI state
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // simple client-side search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch properties from API
  const fetchProperties = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const token = getTokenTOLocalStorage();
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(ITEMS_PER_PAGE),
      });

      const resp = await fetch(`${URL}/property/?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to fetch properties");
      }

      const json = await resp.json();
      const data = json?.data ?? [];
      const meta = json?.meta_data ?? {};

      setProperties(Array.isArray(data) ? data : []);
      setTotalPages(meta?.total_page ? Number(meta.total_page) : 1);
      setTotalEntries(meta?.total ? Number(meta.total) : data.length);
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to fetch properties");
      setProperties([]);
      setTotalPages(1);
      setTotalEntries(0);
    } finally {
      setLoading(false);
    }
  };

  // fetch on mount & when page changes
  useEffect(() => {
    fetchProperties(currentPage);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // search submit handler (client-side filter for displayed page)
  const handleSearch = (values, { setSubmitting }) => {
    setSearchTerm(values.searchTerm.trim());
    setSubmitting(false);
  };

  // client-side filtered list (from the current page payload)
  const filtered = useMemo(() => {
    if (!searchTerm) return properties;
    const q = searchTerm.toLowerCase();
    return properties.filter((p) => {
      const title = String(p?.title ?? "").toLowerCase();
      const body = String(p?.body ?? "").toLowerCase();
      const address = String(p?.address ?? "").toLowerCase();
      return title.includes(q) || body.includes(q) || address.includes(q);
    });
  }, [properties, searchTerm]);

  // pagination helpers
  const paginate = (pageNumber) => {
    const next = Math.min(Math.max(pageNumber, 1), totalPages);
    if (next !== currentPage) {
      setLoading(true);
      setCurrentPage(next);
    }
  };

  // safe helpers
  const firstImageUrl = (item) =>
    item?.propertyImages?.[0]?.url || "/placeholder.png";

  const landSpace = (item) => {
    if (item?.land_space == null || item?.land_space === "") return "";
    return `${item.land_space} SQM`;
  };

  const toSlug = (item) => {
    if (item?.slug) return item.slug;
    const t = String(item?.title ?? "property");
    return t.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="bg-gray">
      <div className="flex items-center justify-center relative">
        <div className="bg-white w-[80%] lg:w-[50%]  rounded-2xl p-10 md:p-20 lg:p-10 xl:p-16 flex flex-col gap-4 absolute top-[-4rem] md:top-[-13rem] lg:top-[-5rem] xl:top-[-8rem]">
          <Formik
            initialValues={{ searchTerm: "" }}
            validationSchema={Yup.object({
              searchTerm: Yup.string().required("Search term is required"),
            })}
            onSubmit={handleSearch}
          >
            <Form className="flex flex-col gap-3 md:gap-4">
              <p className="text-sm md:text-2xl lg:text-base xl:text-lg ">Search:</p>
              <div className="bg-gray flex items-center px-3 py-2 md:py-4 md:px-5 lg:px-3 lg:py-3 gap-2">
                <AiOutlineSearch className="text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6" />
                <Field
                  type="text"
                  name="searchTerm"
                  placeholder="Search For Property"
                  className="text-xs md:text-xl lg:text-sm xl:text-base bg-transparent outline-none"
                />
              </div>
              <ErrorMessage
                name="searchTerm"
                component="div"
                className="text-red-600 text-xs md:text-xl lg:text-sm"
              />
              <button
                type="submit"
                className="bg-orange text-white text-xs md:text-2xl lg:text-base xl:text-lg w-[40%] lg:w-[30%]  px-4 py-1 md:py-3 lg:py-2"
              >
                Search
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      <div className="bg-gray-200 pt-[11rem] pb-10  px-5 md:px-10 md:pt-[14rem] lg:pt-[14rem] xl:pt-[15rem] lg:px-10 xl:px-12 ">
        {/* State banners */}
        {error && (
          <div className="mb-6 p-3 rounded bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-6 p-3 rounded bg-blue-50 text-blue-700 text-sm">
            Loading properties…
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-8 lg:gap-5">
          {filtered.length === 0 && !loading ? (
            <div className="col-span-full text-center text-slate-600">
              No properties found.
            </div>
          ) : (
            filtered.map((item) => (
              <div className="hover:shadow-2xl shadow-slate-500" key={item?.id ?? item?.slug}>
                <div className=" hover:bg-fad flex flex-col gap-2 md:gap-4 px-4 py-4 md:py-6 lg:px-6 lg:py-8 shadow-2xl shadow-slate-400">
                  <div className="bg-white pb-3 md:pb-6 lg:pb-4 rounded-t-xl">
                    <div className="h-48 w-full">
                      <Image
                        src={firstImageUrl(item)}
                        alt={String(item?.title || "property")}
                        className="rounded-t-xl object-cover"
                        width={800}
                        height={400}
                        style={{ width: "100%", height: "100%" }}
                        unoptimized
                      />
                    </div>

                    <div className="px-5 pt-4 md:px-2 lg:px-5 flex flex-col justify-between items-stretch">
                      <p className="text-xs md:text-lg lg:text-sm font-medium flex-grow">
                        {item?.title || "Untitled Property"}
                      </p>
                      <div className="border-gray border-b-[1px] mt-2 md:mt-2 lg:mt-1"></div>
                    </div>

                    <div className="px-5 pt-2 md:px-2 lg:px-5 ">
                      <div className="flex items-stretch ">
                        <p className=" text-xs md:text-lg lg:text-sm leading-5 font-light flex-grow">
                          {item?.body || "No description provided."}
                        </p>
                      </div>
                      <div className="border-gray border-b-[1px] mt-2 md:mt-5 lg:mt-2"></div>
                    </div>

                    <div className="px-5 pt-2 md:px-2 lg:px-5 ">
                      <div className=" flex items-center justify-between gap-2 md:gap-2 lg:gap-2">
                        <div className="flex items-center gap-2">
                          <FaLandmark className="text-orange h-4 w-4 xl:h-5 xl:w-5" />
                          <p className=" text-xs md:text-lg lg:text-sm  leading-5 font-light">
                            {landSpace(item)}
                          </p>
                        </div>
                      </div>

                      <div className="border-gray border-b-[1px] mt-2 md:mt-5"></div>
                      <Link
                        href={`/properties/${toSlug(item)}`}
                        className="hover:bg-lite"
                      >
                        <div className=" flex items-center justify-between gap-2 md:gap-2 lg:gap-2 pt-3">
                          <button className="flex justify-center items-center gap-4 border bg-orange text-white text-xs md:text-lg  lg:text-sm px-6 py-2 md:py-2 lg:py-2">
                            VIEW PROPERTY
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 md:gap-4 pt-10 pb-5 md:pt-16 lg:pt-20 xl:pt-[24rem] cursor-pointer">
            <div
              className="gap-2 p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100"
              onClick={() => paginate(currentPage - 1)}
            >
              <IoIosArrowBack className="h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
            </div>

            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index + 1}
                className={`gap-2 p-2 flex justify-center items-center shadow-2xl h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100 ${
                  currentPage === index + 1 ? "bg-lite text-fad " : "bg-white text-black "
                }`}
                onClick={() => paginate(index + 1)}
              >
                <p className="text-xs md:text-xl lg:text-sm xl:text-base">{index + 1}</p>
              </div>
            ))}

            <div
              className="gap-2 p-2 flex justify-center items-center shadow-2xl bg-white text-black h-8 w-8 md:h-14 md:w-14 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full border border-slate-100"
              onClick={() => paginate(currentPage + 1)}
            >
              <IoIosArrowForward className="h-5 w-5 md:w-7 md:h-7 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projectcomp;
