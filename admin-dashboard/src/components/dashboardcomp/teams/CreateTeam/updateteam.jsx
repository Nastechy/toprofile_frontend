'use client';
import React, { useState } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { URL } from '@/components/utils/client';

// Define the image conversion function
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const UpdateTeam = ({ handleCloseModal }) => {
  const [, setShowForm] = useState(true); // State to control form visibility

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Form Submitted:', values);

    const token = getTokenTOLocalStorage();
    console.log('Token:', token);

    if (!token) {
      console.error('No token found, please log in');
      setSubmitting(false); // Set submitting to false to avoid infinite loading
      return;
    }

    try {
      let base64Image = null;
      if (values.file) {
        base64Image = await convertToBase64(values.file); // Convert the file to Base64
      }

      // Create payload
      const payload = {
        first_name: values.firstname,
        last_name: values.lastname,
        postion: values.postion,
        facebook_link: values.facebook,
        instagram_link: values.instagram,
        email_link: values.mail,
        twitter_link: values.twitter,
        image: base64Image, // Attach the Base64 image string here
      };

      console.log('Payload:', payload);

      const response = await fetch(`${URL}/our_team/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token
        },
        body: JSON.stringify(payload), // Send JSON payload
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(errorData.message || 'Failed to create team member');
      }

      const data = await response.json();
      console.log('Team member created:', data);

      resetForm(); // Reset form after successful submission
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error('Failed to create team member:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between px-20 pt-10 pb-5 ">
        <p className="text-xl">Create Team Member</p>
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>
      <div className="px-20 ">
        <div className="border-b border-slate-300 "></div>
      </div>
      <div className="px-20 py-10  ">
        <div>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              postion: '',
              facebook: '',
              twitter: '',
              instagram: '',
              mail: '',
              file: null,
            }}
            validationSchema={Yup.object({
              firstname: Yup.string().required('First Name is required'),
              lastname: Yup.string().required('Last Name is required'),
              postion: Yup.string().required('Position is required'),
              file: Yup.mixed().required('File is required'),
              facebook: Yup.string().required('Facebook link is required'),
              twitter: Yup.string().required('Twitter link is required'),
              instagram: Yup.string().required('Instagram link is required'),
              mail: Yup.string().required('Email is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                    <label htmlFor="firstname" className="text-sm">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="Dr Femi Osheyin"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                    <label htmlFor="lastname" className="text-sm">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="Dr Femi Osheyin"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[40%] xl:w-[45%] text-sm">
                    <label htmlFor="file" className="text-sm">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0]);
                      }}
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                    />
                    <ErrorMessage name="file" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                    <label htmlFor="postion" className="text-sm">
                      Position
                    </label>
                    <Field
                      type="text"
                      name="postion"
                      placeholder="Architect"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                    />
                    <ErrorMessage name="postion" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-10">
                  <p className="text-xl font-medium">Socials</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                      <label htmlFor="facebook" className="text-sm">
                        Facebook
                      </label>
                      <Field
                        type="text"
                        name="facebook"
                        placeholder="Post link"
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                      />
                      <ErrorMessage
                        name="facebook"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                      <label htmlFor="twitter" className="text-sm">
                        Twitter
                      </label>
                      <Field
                        type="text"
                        name="twitter"
                        placeholder="Post link"
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                      />
                      <ErrorMessage
                        name="twitter"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                      <label htmlFor="instagram" className="text-sm">
                        Instagram
                      </label>
                      <Field
                        type="text"
                        name="instagram"
                        placeholder="Post link"
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                      />
                      <ErrorMessage
                        name="instagram"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                      <label htmlFor="mail" className="text-sm">
                        Mail
                      </label>
                      <Field
                        type="text"
                        name="mail"
                        placeholder="Post link"
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                      />
                      <ErrorMessage name="mail" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end py-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`text-white bg-blue-500 text-sm py-2 px-10 rounded ${
                      isSubmitting ? 'opacity-50' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Create'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeam;
