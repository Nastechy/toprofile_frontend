import React, { useState, useEffect } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { getTokenTOLocalStorage } from "@/components/utils/storage";
import { URL } from "@/components/utils/client";

// Function to convert a file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const UpdateProperty = ({
  handleCloseModal,
  propertySlug,
  fetchProperties,
}) => {
  const [existingPropertyData, setExistingPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Fetch the existing property data to populate the form
  useEffect(() => {
    const fetchPropertyData = async () => {
      const token = getTokenTOLocalStorage();
      try {
        const response = await fetch(
          `${URL}/property/${propertySlug}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setExistingPropertyData(data.data);
      } catch (error) {
        console.error("Failed to fetch property data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const token = getTokenTOLocalStorage();
      try {
        const response = await fetch(
          `${URL}/property/listing/category/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchPropertyData();
    fetchCategories();
  }, [propertySlug]);

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   const token = getTokenTOLocalStorage();

  //   if (!token) {
  //     console.error("No token found, please log in");
  //     return;
  //   }

  //   try {
  //     // Collect image data and convert to base64
  //     const propertyImages = await Promise.all(
  //       [...Array(5)].map(async (_, index) => {
  //         const imageFile = values[`image${index + 1}`];
  //         if (imageFile) {
  //           const base64Image = await convertToBase64(imageFile);
  //           return { image: base64Image, title: `Image Content ${index + 1}` };
  //         }
  //         return null; // Return null for empty fields
  //       })
  //     );

  //     const validImages = propertyImages.filter((image) => image !== null); // Filter out null values

  //     const payload = {
  //       title: values.title,
  //       body: values.body,
  //       address: values.address,
  //       land_space: values.land_space,
  //       amount: values.amount,
  //       category: values.category,
  //       propertyImages: validImages.length ? validImages : undefined, // Send undefined if no images
  //     };

  //     const response = await fetch(
  //       `${URL}/property/${propertySlug}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (response.ok) {
  //       fetchProperties();
  //       resetForm();
  //       handleCloseModal();
  //       console.log("Property updated successfully!");
  //     } else {
  //       const errorResponse = await response.json();
  //       console.error("Failed to update property:", errorResponse);
  //     }
  //   } catch (error) {
  //     console.error("Error updating property:", error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenTOLocalStorage();

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    try {
      // Collect image data and convert to base64
      const propertyImages = await Promise.all(
        [...Array(5)].map(async (_, index) => {
          const imageFile = values[`image${index + 1}`];
          if (imageFile) {
            const base64Image = await convertToBase64(imageFile);
            return { image: base64Image, title: `Image Content ${index + 1}` };
          }
          // Check if an existing image should be kept
          if (existingPropertyData.propertyImages[index]) {
            return existingPropertyData.propertyImages[index]; // Keep existing image
          }
          return null; // Return null for empty fields
        })
      );

      const validImages = propertyImages.filter((image) => image !== null); // Filter out null values

      // Ensure at least one image is present
      if (validImages.length === 0) {
        console.error("At least one image must be provided.");
        return;
      }

      const payload = {
        title: values.title,
        body: values.body,
        address: values.address,
        land_space: values.land_space,
        amount: values.amount,
        category: values.category,
        propertyImages: validImages, // Always include valid images
      };

      const response = await fetch(
        `${URL}/property/${propertySlug}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        fetchProperties();
        resetForm();
        handleCloseModal();
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update property:", errorResponse);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log("existingPropertyData", existingPropertyData);
  return (
    <div>
      <div className="flex items-center justify-end px-20 pt-10 pb-5">
        <MdOutlineCancelPresentation
          className="h-6 w-6"
          onClick={handleCloseModal}
        />
      </div>
      <div className="px-20 py-10">
        <div
          style={{
            maxHeight: "70vh", // Set max height for scrolling
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Formik
            initialValues={{
              title: existingPropertyData.title || "",
              body: existingPropertyData.body || "",
              address: existingPropertyData.address || "",
              land_space: existingPropertyData.land_space || "",
              amount: existingPropertyData.amount || "",
              category: existingPropertyData.category?.id || "", // Use the category ID for the initial value
              // image1: existingPropertyData.propertyImages[0]?.image || null, // Use existing images
              // image2: existingPropertyData.propertyImages[1]?.image || null,
              // image3: existingPropertyData.propertyImages[2]?.image || null,
              // image4: existingPropertyData.propertyImages[3]?.image || null,
              // image5: existingPropertyData.propertyImages[4]?.image || null,
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
              land_space: Yup.number()
                .required("Land space is required")
                .positive()
                .integer(),
              amount: Yup.number().required("Amount is required").positive(),
              category: Yup.string().required("Category is required"),
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
                    placeholder="Enter property title"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="address" className="text-sm">
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Enter property address"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                {/* Land Space and Amount */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="land_space" className="text-sm">
                      Land Space (sqft)
                    </label>
                    <Field
                      type="number"
                      name="land_space"
                      placeholder="Enter land space"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage
                      name="land_space"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[45%]">
                    <label htmlFor="amount" className="text-sm">
                      Amount ($)
                    </label>
                    <Field
                      type="number"
                      name="amount"
                      placeholder="Enter property amount"
                      className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    />
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                {/* Category Dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-sm">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="body" className="text-sm">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="body"
                    placeholder="Enter property description"
                    className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                    rows="4"
                  />
                  <ErrorMessage
                    name="body"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                {/* Image Uploads */}
                {/* <div className="flex flex-col gap-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label htmlFor={`image${index + 1}`} className="text-sm">
                        Image {index + 1}
                      </label>
                      <Field
                        type="file"
                        name={`image${index + 1}`}
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue(
                            `image${index + 1}`,
                            event.currentTarget.files[0]
                          );
                        }}
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                      />
                      {existingPropertyData.propertyImages[index] && (
                        <img
                          src={existingPropertyData.propertyImages[index].image}
                          alt={`Property Image ${index + 1}`}
                          className="w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div> */}
                {/* // Image Uploads */}
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <label htmlFor={`image${index + 1}`} className="text-sm">
                        Image {index + 1}
                      </label>
                      <Field
                        type="file"
                        name={`image${index + 1}`}
                        accept="image/*"
                        onChange={(event) => {
                          setFieldValue(
                            `image${index + 1}`,
                            event.currentTarget.files[0]
                          );
                        }}
                        className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
                      />
                      {existingPropertyData.propertyImages[index] && (
                        <Image
                          src={existingPropertyData.propertyImages[index].image}
                          alt={`Property Image ${index + 1}`}
                          className="w-32 h-32 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
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
