import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

// Function to convert image files to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const UpdateService = ({ handleCloseModal, serviceId, fetchService }) => {
  const [initialData, setInitialData] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const token = getTokenTOLocalStorage();
        if (!token) {
          console.error("No token found, please log in");
          return;
        }

        const response = await fetch(
          `${URL}/our_service/${serviceId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInitialData(data.data); // Assuming the service data is inside 'data.data'
        } else {
          console.error("Failed to fetch service:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    if (serviceId) {
      fetchServiceData();
    }
  }, [serviceId]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    try {
      // Convert selected files to base64
      const base64Images = await Promise.all(
        Array.from(values.files || []).map((file) => fileToBase64(file))
      );

      // Prepare payload with only the updated fields
      const payload = {
        title: values.title,
        content: values.content,
      };

      // Only include the image if a new file was uploaded
      if (base64Images.length > 0) {
        payload.image = base64Images[0]; // Assuming you're sending one image; if multiple, adjust accordingly
      }

      console.log("Updating service:", serviceId);
      console.log("Payload:", payload);

      const response = await fetch(
        `${URL}/our_service/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        fetchService(); // Refresh the service list after submission
        resetForm(); // Reset the form after successful submission
        setShowForm(false); // Hide the form
        handleCloseModal(); // Close the modal
        console.log("Service updated successfully!");
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update service:", errorResponse);
      }
    } catch (error) {
      console.error("Error updating service:", error);
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
              content: initialData?.content || "",
              files: null, // Initial file input will be empty, user can upload new files
            }}
            validationSchema={Yup.object({
              title: Yup.string().max(500).required("Title is required"),
              content: Yup.string().required("Content is required"),
              files: Yup.mixed(),
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
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs"
                  />
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
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500 text-xs"
                  />
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
                      setFieldValue("files", event.currentTarget.files); // Allow multiple files
                    }}
                    multiple
                  />
                  <ErrorMessage
                    name="files"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-center gap-4 pt-16">
                  <button
                    type="submit"
                    className="bg-lite text-sm text-white px-4 py-2 w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base hover:bg-blue"
                  >
                    Update Service
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

export default UpdateService;
