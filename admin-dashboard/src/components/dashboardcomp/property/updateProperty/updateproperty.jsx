"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

const UpdateProperty = ({ handleCloseModal, propertySlug, fetchProperties }) => {
  const [existingPropertyData, setExistingPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = getTokenTOLocalStorage();

    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`${URL}/property/${propertySlug}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setExistingPropertyData(data.data);
      } catch (error) {
        console.error("Failed to fetch property data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/property/listing/category/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchPropertyData();
    fetchCategories();
  }, [propertySlug]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();
    if (!token) return;

    try {
      const fd = new FormData();
      // Scalars
      fd.append("title", values.title);
      fd.append("body", values.body);
      fd.append("address", values.address);
      fd.append("land_space", values.land_space);
      fd.append("amount", values.amount);
      fd.append("category", String(values.category ?? ""));

      // Only append NEW images; backend should keep existing ones if none provided
      const imageFields = ["image1", "image2", "image3", "image4", "image5"];
      imageFields.forEach((key, idx) => {
        const file = values[key];
        if (file instanceof File) {
          fd.append(`propertyImages[${idx}].image`, file, file.name);
        }
      });

      // Use PATCH (safer for partial updates). If your API requires PUT, you can switch it back.
      const response = await fetch(`${URL}/property/${propertySlug}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (response.ok) {
        fetchProperties?.();
        resetForm();
        handleCloseModal?.();
      } else {
        const err = await response.json().catch(() => ({}));
        console.error("Failed to update property:", err);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !existingPropertyData) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation className="h-6 w-6" onClick={handleCloseModal} />
      </div>

      <div className="px-20 py-10">
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Formik
            initialValues={{
              title: existingPropertyData.title || "",
              body: existingPropertyData.body || "",
              address: existingPropertyData.address || "",
              land_space: existingPropertyData.land_space || "",
              amount: existingPropertyData.amount || "",
              category: existingPropertyData.category?.id || "",
              image1: null,
              image2: null,
              image3: null,
              image4: null,
              image5: null,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Title is required"),
              body: Yup.string().required("Description is required"),
              address: Yup.string().required("Address is required"),
              land_space: Yup.number().required("Land space is required").positive().integer(),
              amount: Yup.number().required("Amount is required").positive(),
              category: Yup.string().required("Category is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                {/* Title */}
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

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-sm">Address</label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter property address"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Land Space & Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="land_space" className="text-sm">Land Space (sqft)</label>
                    <Field
                      type="number"
                      name="land_space"
                      placeholder="Enter land space"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="land_space" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="amount" className="text-sm">Amount ($)</label>
                    <Field
                      type="number"
                      name="amount"
                      placeholder="Enter property amount"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage name="amount" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-sm">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="body" className="text-sm">Description</label>
                  <Field
                    as="textarea"
                    name="body"
                    placeholder="Enter property description"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    rows="4"
                  />
                  <ErrorMessage name="body" component="div" className="text-red-500 text-xs" />
                </div>

                {/* Existing Images */}
                {Array.isArray(existingPropertyData.propertyImages) && existingPropertyData.propertyImages.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">Existing Images</label>
                    <div className="flex flex-wrap gap-3">
                      {existingPropertyData.propertyImages.map((img, i) => (
                        <div key={i} className="w-24 h-24 border rounded overflow-hidden">
                          <Image
                            src={img?.image || img?.url || "/placeholder.png"}
                            alt={`Property Image ${i + 1}`}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Images */}
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label htmlFor={`image${index + 1}`} className="text-sm">
                        Add/Replace Image {index + 1}
                      </label>
                      <input
                        type="file"
                        name={`image${index + 1}`}
                        accept="image/*"
                        onChange={(e) => setFieldValue(`image${index + 1}`, e.currentTarget.files?.[0] || null)}
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Update Property
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateProperty;

