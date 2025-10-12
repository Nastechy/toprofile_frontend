import React, { useState } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

// Function to convert image files to base64
export const fileToBase64 = (file) => {
  return new window.Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CreateService = ({
  handleCloseModal,
  fetchService, // Assuming this fetches all services to refresh the list
}) => {
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    try {
      // Convert files to base64 and include in the request body
      const base64Images = await window.Promise.all(
        Array.from(values.files).map((file) => fileToBase64(file)),
      );

      const payload = {
        title: values.title,
        content: values.content,
        image: base64Images[0], // Assuming you're sending one image; if multiple, adjust accordingly
      };

      const response = await fetch(`${URL}/our_service/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchService(); // Refresh the service list after submission
        resetForm(); // Reset the form after successful submission
        setShowForm(false); // Hide the form
        handleCloseModal(); // Close the modal
        console.log('Service submitted successfully!');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to submit service:', errorResponse);
      }
    } catch (error) {
      console.error('Error submitting service:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>

      <div className="px-20 py-10">
        {showForm && (
          <Formik
            initialValues={{
              title: '',
              content: '',
              files: null, // Images will be uploaded as files
            }}
            validationSchema={Yup.object({
              title: Yup.string().max(500).required('Title is required'),
              content: Yup.string().required('Content is required'),
              files: Yup.mixed().required('At least one image is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter service title"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="content" className="text-sm">
                    Content
                  </label>
                  <Field
                    as="textarea"
                    rows={6}
                    name="content"
                    placeholder="Enter service content"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="files" className="text-sm">
                    Images
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={(event) => {
                      setFieldValue('files', event.currentTarget.files); // Allow multiple files
                    }}
                    multiple
                  />
                  <ErrorMessage name="files" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-center gap-4 pt-16">
                  <button
                    type="submit"
                    className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue"
                  >
                    Post Service
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateService;
