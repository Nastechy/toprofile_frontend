// import React, { useState, useEffect } from "react";
// import { MdOutlineCancelPresentation } from "react-icons/md";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Select } from "@chakra-ui/react";
// import { getTokenTOLocalStorage } from "@/components/utils/storage";
// import { URL } from "@/components/utils/client";

// // Function to convert a file to base64
// const convertToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

// const CreateProperty = ({
//   handleCloseModal,
//   propertyId = null,
//   existingPropertyData = {},
//   fetchProperties,
// }) => {
//   const [showForm, setShowForm] = useState(true);
//   const [loading, setLoading] = useState(false); // Loading state
//   const [message, setMessage] = useState(""); // Success or error message
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State for selected category ID

//   const getCategories = async () => {
//     const token = getTokenTOLocalStorage()
//     if (!token) return;

//     try {
//       const response = await fetch(
//         `${URL}/property/listing/category/`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response)
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data.data); // Set the categories in state
//       } else {
//         setMessage("Failed to fetch categories");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setMessage("An error occurred while fetching categories.");
//     }
//   };

//   useEffect(() => {
//     getCategories(); // Fetch all categories on component mount
//   }, [loading]);

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     const token = getTokenTOLocalStorage();

//     if (!token) {
//       console.error("No token found, please log in");
//       setMessage("No token found. Please log in.");
//       return;
//     }

//     setLoading(true); // Start loading

//     try {
//       // Create the form data payload
//       const propertyImages = await Promise.all(
//         [...Array(5)].map(async (_, index) => {
//           const imageFile = values[`image${index + 1}`];
//           if (imageFile) {
//             const base64Image = await convertToBase64(imageFile);
//             return { image: base64Image, title: `Image Content ${index + 1}` };
//           }
//           return null;
//         })
//       );

//       // Filter out null values
//       const validImages = propertyImages.filter((image) => image !== null);

//       const payload = {
//         title: values.title,
//         body: values.body,
//         address: values.address,
//         land_space: values.land_space,
//         amount: values.amount,
//         category: selectedCategoryId, // Include selected category ID
//         propertyImages: validImages,
//       };

//       // Make the POST request
//       const response = await fetch(
//         `${URL}/property/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json", // Sending JSON data
//           },
//           body: JSON.stringify(payload), // Stringify the payload
//         }
//       );

//       if (response.ok) {
//         fetchProperties();
//         resetForm();
//         setShowForm(false);
//         setMessage("Property submitted successfully!");
//       } else {
//         const errorResponse = await response.json();
//         console.error("Failed to submit property:", errorResponse);
//         setMessage("Failed to submit property. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting property:", error);
//       setMessage("An error occurred while submitting the property.");
//     } finally {
//       setLoading(false); // Stop loading
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-end px-20 pt-10 pb-5 cursor-pointer">
//         <MdOutlineCancelPresentation
//           className="h-6 w-6"
//           onClick={handleCloseModal}
//         />
//       </div>

//       <div className="px-20 py-10">
//         {loading && (
//           <div className="text-blue-500 text-center mb-4">
//             Creating property, please wait...
//           </div>
//         )}

//         {message && (
//           <div
//             className={`text-center mb-4 ${
//               message.includes("success") ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {showForm && (
//           <Formik
//             initialValues={{
//               title: existingPropertyData.title || "",
//               body: existingPropertyData.body || "",
//               address: existingPropertyData.address || "",
//               land_space: existingPropertyData.land_space || "",
//               amount: existingPropertyData.amount || "",
//               image1: null,
//               image2: null,
//               image3: null,
//               image4: null,
//               image5: null,
//             }}
//             validationSchema={Yup.object({
//               title: Yup.string().required("Title is required"),
//               body: Yup.string().required("Description is required"),
//               address: Yup.string().required("Address is required"),
//               land_space: Yup.number().required("Land space is required"),
//               amount: Yup.number().required("Amount is required"),
//               image1: Yup.mixed().required("At least one image is required"),
//               // Add validation for selected category
//               category: Yup.number().required("Category is required"),
//             })}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue }) => (
//               <Form className="flex flex-col gap-4">
//                 {/* Title */}
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="title" className="text-sm">
//                     Title
//                   </label>
//                   <Field
//                     type="text"
//                     name="title"
//                     placeholder="Enter property title"
//                     className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                   />
//                   <ErrorMessage
//                     name="title"
//                     component="div"
//                     className="text-red-500 text-xs"
//                   />
//                 </div>

//                 {/* Address and Category */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-col gap-2 w-[45%]">
//                     <label htmlFor="address" className="text-sm">
//                       Address
//                     </label>
//                     <Field
//                       type="text"
//                       name="address"
//                       placeholder="Enter property address"
//                       className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                     />
//                     <ErrorMessage
//                       name="address"
//                       component="div"
//                       className="text-red-500 text-xs"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-2 w-[45%]">
//                     <label htmlFor="category" className="text-sm">
//                       Category
//                     </label>
//                     <select
//                       name="category"
//                       onChange={(e) => {
//                         const selectedId = parseInt(e.target.value); // Parse to integer
//                         setSelectedCategoryId(selectedId);
//                         setFieldValue("category", selectedId); // Update Formik field value
//                       }}
//                       className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                     >
//                       <option value="">Select Category</option>
//                       {categories &&
//                         categories.map((item) => (
//                           <option key={item.id} value={item.id}>
//                             {" "}
//                             {/* Use ID here */}
//                             {item.name}
//                           </option>
//                         ))}
//                     </select>
//                     <ErrorMessage
//                       name="category"
//                       component="div"
//                       className="text-red-500 text-xs"
//                     />
//                   </div>
//                 </div>

//                 {/* Land Space and Amount */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-col gap-2 w-[45%]">
//                     <label htmlFor="land_space" className="text-sm">
//                       Land Space (sqft)
//                     </label>
//                     <Field
//                       type="text"
//                       name="land_space"
//                       placeholder="Enter land space"
//                       className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                     />
//                     <ErrorMessage
//                       name="land_space"
//                       component="div"
//                       className="text-red-500 text-xs"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-2 w-[45%]">
//                     <label htmlFor="amount" className="text-sm">
//                       Amount
//                     </label>
//                     <Field
//                       type="text"
//                       name="amount"
//                       placeholder="Enter property amount"
//                       className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                     />
//                     <ErrorMessage
//                       name="amount"
//                       component="div"
//                       className="text-red-500 text-xs"
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="body" className="text-sm">
//                     Description
//                   </label>
//                   <Field
//                     as="textarea"
//                     name="body"
//                     placeholder="Enter property description"
//                     className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                   />
//                   <ErrorMessage
//                     name="body"
//                     component="div"
//                     className="text-red-500 text-xs"
//                   />
//                 </div>

//                 {/* Image Uploads */}
//                 {[1, 2, 3, 4, 5].map((index) => (
//                   <div className="flex flex-col gap-2" key={index}>
//                     <label htmlFor={`image${index}`} className="text-sm">
//                       Image {index}
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       name={`image${index}`}
//                       onChange={(event) => {
//                         setFieldValue(
//                           `image${index}`,
//                           event.currentTarget.files[0]
//                         );
//                       }}
//                       className="outline-none border text-black border-slate-200 bg-transparent rounded px-4 py-2 text-sm"
//                     />
//                     <ErrorMessage
//                       name={`image${index}`}
//                       component="div"
//                       className="text-red-500 text-xs"
//                     />
//                   </div>
//                 ))}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="bg-[#EB6D2F] text-white py-2 rounded"
//                   disabled={loading}
//                 >
//                   Submit
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateProperty;










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
      const response = await fetch(`${URL}/property/listing/category/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type on GET
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      } else {
        setMessage("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      // Scalars
      fd.append("title", values.title);
      fd.append("body", values.body);
      fd.append("address", values.address);
      fd.append("land_space", values.land_space);
      fd.append("amount", values.amount);
      fd.append("category", String(selectedCategoryId ?? values.category ?? ""));

      // Images from image1..image5 -> propertyImages[i].image
      const imageFields = ["image1", "image2", "image3", "image4", "image5"];
      imageFields.forEach((key, idx) => {
        const file = values[key];
        if (file instanceof File) {
          fd.append(`propertyImages[${idx}].image`, file, file.name);
        }
      });

      const response = await fetch(`${URL}/property/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type here (browser will add multipart boundary)
        },
        body: fd,
      });

      if (response.ok) {
        fetchProperties?.();
        resetForm();
        setShowForm(false);
        setMessage("Property submitted successfully!");
        handleCloseModal?.();
      } else {
        const errorResponse = await response.json().catch(() => ({}));
        console.error("Failed to submit property:", errorResponse);
        setMessage(errorResponse?.message || "Failed to submit property. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
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
          <div className={`text-center mb-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
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
              land_space: Yup.number().required("Land space is required"),
              amount: Yup.number().required("Amount is required"),
              image1: Yup.mixed().required("At least one image is required"),
              category: Yup.number().typeError("Category is required").required("Category is required"),
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

                {/* Address & Category */}
                <div className="flex items-center justify-between">
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

                {/* Land space & Amount */}
                <div className="flex items-center justify-between">
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

                {/* Description */}
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

                {/* Images */}
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
