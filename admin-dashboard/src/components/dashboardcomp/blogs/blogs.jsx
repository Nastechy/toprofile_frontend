/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';
import Createblogs from './CreateBlogs/createblogs';
import UpdateBlog from './UpdateBlogs/updateblog';
import Image from 'next/image';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const Blogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const token = getTokenTOLocalStorage();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Format as "MM/DD/YYYY"
    } catch (error) {
      return 'Invalid date';
    }
  };

  const handleEditClick = (blog) => {
    setShowBlogModal(true);
    setSelectedBlog(blog);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${URL}/blog/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      console.error('No token found, please log in');
      setError('No token found, please log in');
      setLoading(false);
      return;
    }
    fetchBlogs();
  }, [showModal, token]); // Always include 'token' as a dependency

  const handleDeleteBlog = async (slug) => {
    try {
      const response = await fetch(`${URL}/blog/${slug}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the blog');
      }

      fetchBlogs();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateblogsClick = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white h-screen">
      <div className="flex justify-end items-center px-10 lg:py-10 xl:px-16 xl:py-10">
        <button
          className="bg-lite px-3 py-2 text-[12px] font-semibold text-white flex justify-center items-center gap-2 rounded-md"
          onClick={handleCreateblogsClick}
        >
          <MdAdd color="white" className="text-white h-4 w-4 font-semibold" />
          Create Post
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
                <th className="text-left px-4 py-3 w-[160px]">Date</th>
                <th className="text-left px-4 py-3 w-[140px]">Views</th>
                <th className="text-center px-4 py-3 w-[140px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((datum, index) => (
                  <tr key={datum.id ?? index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Image
                          src={datum.image || '/placeholder.png'}
                          alt={datum.title || 'blog'}
                          width={60}
                          height={60}
                          className="w-[60px] h-[60px] object-cover rounded"
                          unoptimized
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{datum.title}</p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-xs">{formatDate(datum.created_at)}</p>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <IoMdEye />
                        <p className="text-xs">{datum.view}</p>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(datum.slug)}
                          title="Edit"
                          className="p-2 rounded hover:bg-slate-100"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(datum.slug)}
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
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal components */}
      {showModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <Createblogs handleCloseModal={handleCloseModal} fetchBlogs={fetchBlogs} />
          </div>
        </div>
      )}
      {showBlogModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-[70%] bg-white shadow-2xl rounded-lg overflow-y-auto">
            <UpdateBlog
              blogId={selectedBlog}
              handleCloseModal={() => setShowBlogModal(false)}
              fetchBlogs={fetchBlogs}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
