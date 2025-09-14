import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

const UpdateBlog = ({ handleCloseModal, blogId, fetchBlogs }) => {
  const [initialData, setInitialData] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const token = getTokenTOLocalStorage();
        if (!token) {
          console.error("No token found, please log in");
          return;
        }

        const response = await fetch(
          `${URL}/blog/${blogId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInitialData(data.data); // Update to data.data to access actual blog data
        } else {
          console.error("Failed to fetch blog:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("body", values.text);
      formData.append("author_name", values.name);
      formData.append("reading_time", values.readingtime);
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await fetch(
        `${URL}/blog/${blogId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        fetchBlogs();
        resetForm();
        setShowForm(false);
        handleCloseModal();
        console.log("Blog updated successfully!");
      } else {
        console.error("Failed to update blog:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation
          className="h-6 w-6"
          onClick={handleCloseModal}
        />
      </div>

      <div className="px-20 py-10">
        {showForm && initialData && (
          <Formik
            enableReinitialize={true}
            initialValues={{
              title: initialData?.title || "",
              name: initialData?.author_name || "",
              readingtime: initialData?.reading_time || "",
              text: initialData?.body || "",
              image: initialData?.image || null,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Field cannot be empty"),
              name: Yup.string().required("Field cannot be empty"),
              readingtime: Yup.string().required("Field cannot be empty"),
              text: Yup.string().required("Field cannot be empty"),
              image: Yup.mixed()
                .nullable()
                .test("fileSize", "File size is too large", (value) => {
                  if (!value) return true;
                  return value.size <= 5 * 1024 * 1024; // Max 5MB
                })
                .test("fileType", "Unsupported file type", (value) => {
                  if (!value) return true;
                  return ["image/jpeg", "image/png"].includes(value.type);
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
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[40%]">
                    <label htmlFor="name" className="text-sm">
                      Author Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[40%]">
                    <label htmlFor="readingtime" className="text-sm">
                      Reading Time
                    </label>
                    <Field
                      type="text"
                      name="readingtime"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage
                      name="readingtime"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="text" className="text-sm">
                    Content
                  </label>
                  <Field
                    as="textarea"
                    rows={10}
                    name="text"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="image" className="text-sm">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/jpeg, image/png"
                    onChange={(event) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="flex items-center justify-center pt-16">
                  <button
                    type="submit"
                    className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue hover:text-white"
                  >
                    Update
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

export default UpdateBlog;
