import React, { useState } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CreateTestimonial = ({ handleCloseModal, fetchTestimonials }) => {
  const [showForm, setShowForm] = useState(true); // State to control form visibility
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    try {
      let base64Image = null;
      if (values.file) {
        base64Image = await convertToBase64(values.file); // Convert to Base64
      }

      // Prepare payload
      const payload = {
        name: values.name,
        comment: values.comment,
        image: base64Image, // Ensure this is an array
      };
      console.log('payload>>>', payload);
      // Make a POST request to the API
      const response = await fetch(`${URL}/testimony/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Use the token
          'Content-Type': 'application/json', // Ensure the content type is set correctly
        },
        body: JSON.stringify(payload),
      });
      console.log('res>>>', response);

      if (response.ok) {
        fetchTestimonials();
        // Reset the form on successful submission
        resetForm();
        setShowForm(false);
        handleCloseModal(); // Optionally hide the form
        console.log('Testimonial created successfully!');
      } else {
        console.error('Failed to create Testimonial:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating Testimonial:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5 ">
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>

      <div className="px-20 py-10  ">
        <div>
          <div className="">
            <Formik
              initialValues={{
                name: '',
                comment: '',
                file: null,
              }}
              validationSchema={Yup.object({
                // Validation schema
                name: Yup.string().required('Field cannot be empty'),
                comment: Yup.string().required('Field cannot be empty'),
                file: Yup.mixed().required('File is required'),
              })}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col gap-4 ">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                      <label htmlFor="name" className="text-sm ">
                        Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Dr Femi Osheyin"
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm  focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%] text-sm ">
                      <label htmlFor="file" className="text-sm ">
                        {' '}
                        Image
                      </label>
                      <input
                        type="file"
                        name="file"
                        className="outline-none border text-black border-slate-200  bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400 "
                        onChange={(event) => {
                          setFieldValue('file', event.currentTarget.files[0]);
                        }}
                        multiple
                      />
                      <ErrorMessage
                        name="file"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="text" className="xl:text-sm">
                      Comment
                    </label>
                    <Field
                      as="textarea"
                      rows={4}
                      name="comment"
                      placeholder="Write a message"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                    />
                    <ErrorMessage name="text" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="flex items-center justify-center pt-16">
                    <button
                      type="submit"
                      className="bg-lite text-sm  text-white px-4 py-2  w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base  hover:bg-blue hover:text-white"
                    >
                      Post
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimonial;
