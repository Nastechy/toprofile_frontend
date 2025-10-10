'use client';
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import Image from 'next/image';
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import CreateTeam from './CreateTeam/createteam';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from 'react-icons/io';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const Teams = () => {
  const [showModal, setShowModal] = useState(false);

  const [, setShowTeamModal] = useState(false);
  const [team, setTeam] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const token = getTokenTOLocalStorage();
  const [, setSelectedTeam] = useState(null);
  if (!token) {
    console.error('No token found, please log in');
    return;
  }
  const handleDeleteTeam = async (id) => {
    if (!token) {
      console.error('No token found, please log in');
      return;
    }
    try {
      const response = await fetch(`${URL}/our_team/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the blog');
      }

      fetchTeam();
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError(error.message);
    }
  };
  console.log('reponse>>>', team);
  const handleEditClick = (ourTeam) => {
    setShowTeamModal(true);
    setSelectedTeam(ourTeam); // Pass the blog data to the modal
  };
  const fetchTeam = async () => {
    try {
      const response = await fetch(`${URL}/our_team/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data);
      setTeam(data.data); // Assuming the response is in the expected format
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [showModal]);

  const handleCreateTeamClick = () => {
    setShowModal((prevState) => !prevState); // Toggle modal visibility
  };
  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="bg-white ">
      <div className="flex justify-end items-center px-10 lg:py-10 xl:px-16 xl:py-10 ">
        <button
          className="bg-lite px-3 py-2 text-[12px] font-semibold text-white flex justify-center items-center gap-2 rounded-md"
          onClick={handleCreateTeamClick}
        >
          <MdAdd color="white" className="text-white h-4 w-4 font-semibold" />
          Add a member
        </button>
      </div>

      <div className="px-10 xl:px-16">
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="min-w-full table-auto text-sm xl:text-base">
            <thead className="bg-slate-50 h-[7vh]">
              <tr>
                <th className="text-left px-4 py-3 w-[80px]">S/N</th>
                <th className="text-left px-4 py-3 w-[120px]">Image</th>
                <th className="text-left px-4 py-3 w-[180px]">First Name</th>
                <th className="text-left px-4 py-3 w-[180px]">Last Name</th>
                <th className="text-left px-4 py-3">Position</th>
                <th className="text-center px-4 py-3 w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(team) && team.length > 0 ? (
                team.map((datum, index) => (
                  <tr key={datum.id ?? index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image
                          src={datum.image || '/placeholder.png'}
                          alt={
                            `${datum.first_name ?? ''} ${datum.last_name ?? ''}`.trim() || 'team'
                          }
                          width={60}
                          height={60}
                          className="w-[60px] h-[60px] object-cover rounded"
                          unoptimized
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{datum.first_name}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{datum.last_name}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{datum.position ?? datum.postion}</p>
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
                          onClick={() => handleDeleteTeam(datum.id)}
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
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center px-5 pt-[300px] pb-10 ">
        <div>
          <p className="text-sm text-slate-500">Showing 1 to 10 of 20 entries</p>
        </div>
        <div className="flex items-center justify-center text-slate-500 text-sm gap-3">
          <div className="flex items-center gap-1 rounded-md border border-slate-300 p-2">
            <IoIosArrowRoundBack className="h-6 w-6" />
            <p className="text-sm cursor-pointer">Previous</p>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-slate-300 p-2">
            <p className="text-sm cursor-pointer">Next</p>
            <IoIosArrowRoundForward className="h-4 w-4" />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] top-6 left-[8rem] xl:left-[9rem] xl:top-[1.5rem] h-[80vh] bg-white  shadow-2xl rounded-lg overflow-y-auto">
            {/* Your modal content goes here */}
            <CreateTeam handleCloseModal={handleCloseModal} />{' '}
            {/* This assumes your modal content is in the Notifications component */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
