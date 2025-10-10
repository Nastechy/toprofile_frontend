import React, { useState, useEffect } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const UpdateTestimonial = ({ handleCloseModal, testimonialId, fetchTestimonials }) => {
  const [loading, setLoading] = useState(false);
  console.log('testimonialId', testimonialId);
  const [testimonialData, setTestimonialData] = useState({
    name: '',
    comment: '',
    image: null,
  });

  // Fetch existing testimonial data when component mounts
  useEffect(() => {
    const fetchTestimonialData = async () => {
      const token = getTokenTOLocalStorage();

      if (!token) {
        console.error('No token found, please log in');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${URL}/testimony/${testimonialId}/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('response>>>', response);
        if (response.ok) {
          const data = await response.json();
          console.log('data>>>', data);
          setTestimonialData({
            name: data.data.name || '',
            comment: data.data.comment || '',
            image: null, // We cannot prepopulate a file input, so leave it null
          });
        } else {
          console.error('Failed to fetch Testimonial:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching Testimonial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonialData();
  }, [testimonialId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error('No token found, please log in');
      return;
    }

    try {
      setLoading(true);

      // Prepare FormData
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('comment', values.comment);

      if (values.image) {
        formData.append('file', values.image);
      }

      // Make a PUT request to the API to update the testimonial by ID
      const response = await fetch(`${URL}/testimony/${testimonialId}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        fetchTestimonials();
        resetForm();
        handleCloseModal();
        console.log('Testimonial updated successfully!');
      } else {
        console.error('Failed to update Testimonial:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Testimonial:', error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  console.log('testimonialData', testimonialData);
  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>

      <div className="px-20 py-10">
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: testimonialData?.name || '',
              comment: testimonialData?.comment || '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Field cannot be empty'),
              comment: Yup.string().required('Field cannot be empty'),
              image: Yup.mixed(),
            })}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 w-[40%] xl:w-[45%]">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Dr Femi Osheyin"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs md:text-xl lg:text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[40%] xl:w-[45%] text-sm">
                  <label htmlFor="file" className="text-sm">
                    Image
                  </label>
                  <Field
                    type="file"
                    name="image"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                  />
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500 text-xs md:text-xl lg:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="comment" className="xl:text-sm">
                  Comment
                </label>
                <Field
                  as="textarea"
                  rows={4}
                  name="comment"
                  placeholder="Write a message"
                  className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400"
                />
                <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex items-center justify-center pt-16">
                <button
                  type="submit"
                  className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue hover:text-white"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateTestimonial;
