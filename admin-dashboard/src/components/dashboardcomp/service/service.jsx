'use client';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Image from 'next/image';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import CreateService from './createService/createservice';
import UpdateService from './updateService/updateservice';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const Service = () => {
  const [showModal, setShowModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const token = getTokenTOLocalStorage();
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
  const handleCreateServiceClick = () => {
    setShowModal((prevState) => !prevState); // Toggle modal visibility
  };
  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  const [service, setService] = useState([]);
  const [, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(0);
  const [totalEntries] = useState(0);
  const itemsPerPage = 10;

  const fetchService = async () => {
    try {
      const response = await axios.get(`${URL}/our_service/`);
      setService(response.data.data);
    } catch (err) {
      setError('Failed to fetch service');
      console.error(err);
    }
  };
  useEffect(() => {
    fetchService();
  }, [currentPage]);
  const handleDeleteService = async (id) => {
    if (!token) {
      console.error('No token found, please log in');
      return;
    }
    try {
      const response = await fetch(`${URL}/our_service/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the blog');
      }

      fetchService();
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError(error.message);
    }
  };
  const handleEditClick = (service) => {
    setShowServiceModal(true);
    setSelectedService(service);
  };
  return (
    <div className="bg-white ">
      <div className="flex justify-end items-center px-10 lg:py-10 xl:px-16 xl:py-10 ">
        <button
          className="bg-lite px-3 py-2 text-[12px] font-semibold text-white flex justify-center items-center gap-2 rounded-md"
          onClick={handleCreateServiceClick}
        >
          <MdAdd color="white" className="text-white h-4 w-4 font-semibold" />
          Create Service
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
                <th className="text-left px-4 py-3">Content</th>
                <th className="text-center px-4 py-3 w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(service) && service.length > 0 ? (
                service.map((datum, index) => (
                  <tr key={datum.id ?? index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image
                          src={datum.image || '/placeholder.png'}
                          alt={datum.title || 'service'}
                          width={60}
                          height={60}
                          className="w-[60px] h-[60px] object-cover rounded"
                          unoptimized
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{truncateDescription(datum.title, 40)}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{truncateDescription(datum.content, 80)}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(datum.id)}
                          title="Edit"
                          className="p-2 rounded hover:bg-slate-100"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteService(datum.id)}
                          title="Delete"
                          className="p-2 rounded hover:bg-red-50"
                        >
                          <MdDeleteOutline className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                    No Service available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 pt-[300px] pb-10 ">
        <div>
          <p className="text-sm text-slate-500">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalEntries)} to{' '}
            {Math.min(currentPage * itemsPerPage, totalEntries)} of {totalEntries} entries
          </p>
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-500 text-sm">
          <div
            className={`flex items-center gap-1 rounded-md border border-slate-300 p-2 ${
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
            className={`flex items-center gap-1 rounded-md border border-slate-300 p-2 ${
              currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          >
            <p className="text-sm">Next</p>
            <IoIosArrowRoundForward className="h-6 w-6" />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] top-6 left-[8rem] xl:left-[9rem] xl:top-[1.5rem] h-[80vh] bg-white  shadow-2xl rounded-lg overflow-y-auto">
            {/* Your modal content goes here */}
            <CreateService fetchService={fetchService} handleCloseModal={handleCloseModal} />{' '}
            {/* This assumes your modal content is in the Notifications component */}
          </div>
        </div>
      )}
      {showServiceModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <UpdateService
              serviceId={selectedService}
              handleCloseModal={() => setShowServiceModal(false)}
              fetchService={fetchService}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
