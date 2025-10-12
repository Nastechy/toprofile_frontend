'use client';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Image from 'next/image';
// import CreateProperty from "./CreateProperty/createproperty";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { URL } from '@/components/utils/client';

const About = () => {
  const [, setShowModal] = useState(false);

  function truncateDescription(description, maxLength) {
    // Check if the description is defined and has a valid length
    if (description && description.length > maxLength) {
      // Truncate the description and add an ellipsis
      return `${description.substring(0, maxLength)}...`;
    } else {
      // If the description is already shorter or undefined, return it as is
      return description;
    }
  }
  const handleCreatePropertyClick = () => {
    setShowModal((prevState) => !prevState); // Toggle modal visibility
  };

  const [properties, setProperties] = useState([]);
  const [, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEntries, setTotalEntries] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${URL}/property`, {
          params: {
            page: currentPage,
            per_page: itemsPerPage,
          },
        });
        setProperties(response.data.data);
        setTotalPages(response.data.meta_data.total_page);
        setTotalEntries(response.data.meta_data.total);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      }
    };

    fetchProperties();
  }, [currentPage]);

  return (
    <div className="bg-white ">
      <div className="flex justify-end items-center px-10 lg:py-10 xl:px-16 xl:py-10 ">
        <button
          className="bg-lite px-4 py-2 text-white flex justify-center items-center gap-2"
          onClick={handleCreatePropertyClick}
        >
          <MdAdd color="white" className="text-white h-4 w-4 xl:h-6 xl:w-6" />
          Create Property
        </button>
      </div>

      <div className=" pt-5 px-10 xl:px-16  ">
        <div className="cursor-pointer border border-slate-300"></div>
      </div>

      <div className="px-10 xl:px-16 ">
        {properties.length > 0 ? (
          properties.map((datum) => (
            <table key={datum.id} className="table-auto w-full text-sm xl:text-base ">
              <thead className=" h-[7vh]">
                <tr className="">
                  <th className="w-[10%]">
                    <div className="flex items-center gap-2 justify-center">
                      {/* <input type='checkbox' /> */}
                      <p className="text-center text-sm  font-medium">S/N</p>
                    </div>
                  </th>
                  <th className="w-[15%]">
                    <p className="text-center text-sm font-medium">Image</p>
                  </th>

                  <th className="w-[30%]">
                    <p className="text-center text-sm font-medium">Title</p>
                  </th>
                  <th className="w-[30%]">
                    <p className="text-center text-sm font-medium">Description</p>
                  </th>

                  <th className="w-[15%]">
                    <p className="text-center text-sm font-medium">Actions</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={datum.id}
                  className="h-[6vh] bg-white border-b border-slate-300 text-black "
                >
                  <td className="w-[10%] ">
                    <div className="flex items-center gap-2 justify-center">
                      {/* <input type='checkbox' /> */}
                      <p className="text-xs  text-black font-semibold">{datum.idUser}</p>
                    </div>
                  </td>
                  <td className="w-[15%] ">
                    <div className="flex items-center justify-center gap-2">
                      <Image
                        src={datum.pic}
                        alt="pic-img"
                        className="w-[20%] xl:w-[15%]"
                        width={10}
                        height={10}
                      />
                    </div>
                  </td>
                  <td className=" w-[30%]">
                    <div className="text-center ">
                      <p className="text-xs">{truncateDescription(datum.title, 20)}</p>
                    </div>
                  </td>
                  <td className="w-[30%] ">
                    <div className="text-center ">
                      <p className="text-xs">{truncateDescription(datum.desc, 40)}</p>
                    </div>
                  </td>

                  <td className="text-center w-[15%]">
                    <div className="flex justify-center items-center gap-0">
                      <p className="text-xs ">{datum.actiontwo}</p>
                      <p className="text-xs ">{datum.action}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <p className="w-full bg-primary text-center">No property available</p>
        )}
      </div>

      <div className="flex justify-between items-center px-5 pt-[300px] pb-10 ">
        <div>
          <p className="text-sm text-slate-500">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} to{' '}
            {Math.min(currentPage * itemsPerPage, totalEntries)} of {totalEntries} entries
          </p>
        </div>
        <div className="flex items-center justify-center text-slate-500 text-sm">
          <div
            className={`flex items-center gap-2 border border-slate-300 p-2 ${
              currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            <IoIosArrowRoundBack className="h-6 w-6" />
            <p className="text-sm">Previous</p>
          </div>

          {[...Array(totalPages)].map((_, index) => (
            <div
              key={index}
              className={`border border-slate-300 px-4 py-2 ${
                currentPage === index + 1 ? 'bg-lite text-white' : 'hover:bg-lite hover:text-white'
              } cursor-pointer`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <p className="text-sm">{index + 1}</p>
            </div>
          ))}

          <div
            className={`flex items-center gap-2 border border-slate-300 p-2 ${
              currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          >
            <p className="text-sm">Next</p>
            <IoIosArrowRoundForward className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] top-6 left-[8rem] xl:left-[9rem] xl:top-[1.5rem] h-[80vh] bg-white  shadow-2xl rounded-lg overflow-y-auto">
            
            <CreateProperty handleCloseModal={handleCloseModal} />{" "}
           
          </div>
        </div>
      )} */}
    </div>
  );
};

export default About;
