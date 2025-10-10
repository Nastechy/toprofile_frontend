import React, { useState } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const Createblogs = ({ handleCloseModal, blogId = null, existingBlogData = {}, fetchBlogs }) => {
  const [showForm, setShowForm] = useState(true);

  // Load existing blog data if updating
  const isUpdating = blogId !== null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('body', values.text);
      formData.append('author_name', values.name);
      formData.append('reading_time', values.readingtime);
      if (values.image) {
        formData.append('image', values.image);
      }

      const requestMethod = isUpdating ? 'PUT' : 'POST';
      const endpoint = isUpdating ? `${URL}/blog/${blogId}/` : `${URL}/blog/`;

      // Make a POST/PUT request to the API
      const response = await fetch(endpoint, {
        method: requestMethod,
        headers: {
          Authorization: `Bearer ${token}`, // Use the token
        },
        body: formData,
      });

      if (response.ok) {
        fetchBlogs();
        resetForm();
        setShowForm(false);
        handleCloseModal(); // Optionally hide the form
        console.log('Blog submitted successfully!');
      } else {
        console.error('Failed to submit blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    try {
      const response = await fetch(`${URL}/blog/${blogId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Use the token
        },
      });

      if (response.ok) {
        handleCloseModal();
        console.log('Blog deleted successfully!');
      } else {
        console.error('Failed to delete blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation
          className="h-6 w-6 cursor-pointer"
          onClick={handleCloseModal}
        />
      </div>

      <div className="px-20 py-10">
        {showForm && (
          <Formik
            initialValues={{
              title: existingBlogData.title || '',
              name: existingBlogData.name || '',
              readingtime: existingBlogData.readingtime || '',
              text: existingBlogData.text || '',
              image: null, // File input is always null initially
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Field cannot be empty'),
              name: Yup.string().required('Field cannot be empty'),
              readingtime: Yup.string().required('Field cannot be empty'),
              text: Yup.string().required('Field cannot be empty'),
              image: Yup.mixed()
                .nullable()
                .test('fileSize', 'File size is too large', (value) => {
                  if (!value) return true;
                  return value.size <= 5 * 1024 * 1024; // Max 5MB
                })
                .test('fileType', 'Unsupported file type', (value) => {
                  if (!value) return true;
                  return ['image/jpeg', 'image/png'].includes(value.type);
                }),
            })}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter blog title"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Author Name and Reading Time */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[40%]">
                    <label htmlFor="name" className="text-sm">
                      Author Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Author name"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex flex-col gap-2 w-[40%]">
                    <label htmlFor="readingtime" className="text-sm">
                      Reading Time
                    </label>
                    <Field
                      type="text"
                      name="readingtime"
                      placeholder="E.g., 5 mins"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage
                      name="readingtime"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                {/* Blog Content */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="text" className="text-sm">
                    Content
                  </label>
                  <Field
                    as="textarea"
                    rows={10}
                    name="text"
                    placeholder="Write the blog content"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="image" className="text-sm">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/png"
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Submit, Update and Delete buttons */}
                <div className="flex items-center justify-center gap-4 pt-16">
                  {!isUpdating ? (
                    <button
                      type="submit"
                      className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue"
                    >
                      Post
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Createblogs;
