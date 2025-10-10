'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineCancelPresentation, MdDeleteOutline } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const CreatePropertyCategory = ({ handleCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch all categories
  const getCategories = async () => {
    const token = getTokenTOLocalStorage();
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }
    try {
      const response = await fetch(`${URL}/property/listing/category/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data?.data ?? []);
      setMessage('');
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage('Failed to fetch categories.');
    }
  };

  // Fetch once on mount
  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    setLoading(true);
    try {
      const payload = { name: values.name };
      const response = await fetch(`${URL}/property/listing/category/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create category.');
      setMessage('Category created successfully!');
      resetForm();
      await getCategories(); // refresh table
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while creating the category.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!confirm('Delete this category?')) return;

    const token = getTokenTOLocalStorage();
    if (!token) {
      setMessage('No token found. Please log in.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${URL}/property/listing/category/${categoryId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete category.');
      setMessage('Category deleted successfully!');
      await getCategories(); // refresh table
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while deleting the category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8">
      <div className="flex items-center justify-between px-11 mb-5 ">
        <h1 className="text-xl font-bold">Category</h1>
        <button
          className="p-1 rounded hover:bg-slate-100"
          onClick={handleCloseModal}
          aria-label="Close"
          type="button"
        >
          <MdOutlineCancelPresentation className="h-6 w-6" />
        </button>
      </div>

      {/* Status */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12">
        {loading && <div className="text-[#EC7937] mb-3 text-sm">Processing, please wait…</div>}
        {message && (
          <div
            className={`mb-3 text-sm ${
              message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 pb-6">
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Name is required')
              .min(1, 'Name must be at least 1 character long')
              .max(225, 'Name must be at most 225 characters long'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  New Category Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter new category name"
                  className="outline-none text-[10px] italic border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="bg-lite text-sm text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting || loading ? 'Saving…' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="px-6 sm:px-8 md:px-10 lg:px-12 pb-8">
        <h2 className="text-sm font-semibold mb-3">Category Listing</h2>
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-4 py-3 w-[80px]">S/N</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-center px-4 py-3 w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                categories.map((category, idx) => (
                  <tr key={category.id ?? `${category.name}-${idx}`} className="border-t">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleDelete(category.id)}
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
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyCategory;
