"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";


const CreateProperty = ({
  handleCloseModal,
  propertyId = null,
  existingPropertyData = {},
  fetchProperties,
}) => {
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const getCategories = async () => {
    const token = getTokenTOLocalStorage();
    if (!token) return;
    try {
      const res = await fetch(`${URL}/property/listing/category/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data?.data ?? []);
      } else {
        setMessage("Failed to fetch categories");
      }
    } catch (e) {
      setMessage("An error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("title", values.title);
      fd.append("body", values.body);
      fd.append("address", values.address);
      fd.append("land_space", values.land_space);
      fd.append("amount", values.amount);
      fd.append("category", String(selectedCategoryId ?? values.category ?? ""));

      const imageFields = ["image1", "image2", "image3", "image4", "image5"];
      let i = 0;
      for (const key of imageFields) {
        const file = values[key];
        if (file && file instanceof File) {
          fd.append(`propertyImages[${i}]`, file, file.name);
          // If backend expects a title per image, uncomment next line:
          // fd.append(`propertyImages[${i}].title`, `Image ${i + 1}`);
          i++;
        }
      }

      const res = await fetch(`${URL}/property/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type
        body: fd,
      });

      if (res.ok) {
        fetchProperties?.();
        resetForm();
        setShowForm(false);
        setMessage("Property submitted successfully!");
        handleCloseModal?.();
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage(err?.message || "Failed to submit property. Please try again.");
      }
    } catch (e) {
      setMessage("An error occurred while submitting the property.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5 cursor-pointer">
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>

      <div className="px-20 py-10">
        {loading && <div className="text-blue-500 text-center mb-4">Creating property, please wait...</div>}

        {message && (
          <div className={`text-center mb-4 ${message.toLowerCase().includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )}

        {showForm && (
          <Formik
            initialValues={{
              title: existingPropertyData.title || "",
              body: existingPropertyData.body || "",
              address: existingPropertyData.address || "",
              land_space: existingPropertyData.land_space || "",
              amount: existingPropertyData.amount || "",
              category: "",
              image1: null ,
              image2: null ,
              image3: null ,
              image4: null ,
              image5: null ,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Title is required"),
              body: Yup.string().required("Description is required"),
              address: Yup.string().required("Address is required"),
              land_space: Yup.number().typeError("Must be a number").required("Land space is required"),
              amount: Yup.number().typeError("Must be a number").required("Amount is required"),
              image1: Yup.mixed().required("At least one image is required"),
              category: Yup.number().typeError("Category is required").required("Category is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm">Title</label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter property title"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                </div>

                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="address" className="text-sm">Address</label>
                    <Field
                      type="text"
                      name="address"
                      placeholder="Enter property address"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="category" className="text-sm">Category</label>
                    <Field
                      as="select"
                      name="category"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setSelectedCategoryId(id);
                        setFieldValue("category", id);
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6">
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="land_space" className="text-sm">Land Space (sqft)</label>
                    <Field
                      type="text"
                      name="land_space"
                      placeholder="Enter land space"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="land_space" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="amount" className="text-sm">Amount</label>
                    <Field
                      type="text"
                      name="amount"
                      placeholder="Enter property amount"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="body" className="text-sm">Description</label>
                  <Field
                    as="textarea"
                    name="body"
                    placeholder="Enter property description"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="body" component="div" className="text-red-500 text-xs" />
                </div>

                {[1, 2, 3, 4, 5].map((i) => (
                  <div className="flex flex-col gap-2" key={i}>
                    <label htmlFor={`image${i}`} className="text-sm">Image {i}</label>
                    <input
                      type="file"
                      accept="image/*"
                      name={`image${i}`}
                      onChange={(e) => setFieldValue(`image${i}`, e.currentTarget.files?.[0] || null)}
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name={`image${i}`} component="div" className="text-red-500 text-xs" />
                  </div>
                ))}

                <button type="submit" className="bg-[#EB6D2F] text-white py-2 rounded" disabled={loading}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CreateProperty;
