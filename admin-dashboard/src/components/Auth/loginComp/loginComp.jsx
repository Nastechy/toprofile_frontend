'use client';
import React, { useState } from 'react';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Bgg from '../../../../public/img/bgg.jpeg';
import bg from '../../../../public/img/to.png';
import styles from './logincomp.module.css';
import Image from 'next/image';
import { addTokenTOLocalStorage } from '@/components/utils/storage';
import { URL } from '@/components/utils/client';

const LoginComp = () => {
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`${URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        addTokenTOLocalStorage(data.data.access);
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
        // Optionally store the token or user data here
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Authentication Failed',
          description: errorData.message || 'Login Failed.',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: 'Authentication Failed',
        description: 'An error occurred during authentication.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="flex-1">
        <Image
          src={Bgg}
          className="h-[70vh] lg:h-screen w-full"
          alt="bgg-img"
          width={10}
          height={10}
        />
      </div>

      <div className="flex-1 bg-white flex items-center justify-center py-10">
        <div className="flex flex-col justify-center gap-5 md:gap-10 lg:gap-5">
          <div className="flex justify-center items-center">
            <Image src={bg} className="w-[30%] md:w-[50%] lg:w-[30%]" alt="bg-img" />
          </div>
          <div>
            <p className="text-base md:text-3xl lg:text-xl xl:text-2xl font-bold text-center">
              Welcome Back
            </p>
          </div>
          <div className="flex justify-center px-5 py-3 md:px-20 md:py-10">
            <div className="w-[80%]">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Field cannot be empty'),
                  password: Yup.string()
                    .min(6, 'Password should be at least 6 characters')
                    .required('Field cannot be empty'),
                })}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values, isSubmitting }) => (
                  <Form className="flex flex-col gap-4" autoComplete="off">
                    <div className="flex flex-col gap-2 text-gray-500">
                      <Field
                        className="w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl px-2 py-2 md:py-3 lg:py-2 text-xs md:text-2xl lg:text-base focus-visible:border-slate-400"
                        placeholder="Email"
                        type="text"
                        name="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-gray-500">
                      <div className="flex justify-between items-center w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl px-2 py-2 md:py-3 lg:py-2 text-xs md:text-2xl lg:text-base focus-visible:border-slate-400">
                        <Field
                          className="outline-none bg-transparent"
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                        />
                        <div className="text-lite" onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <BsFillEyeFill className={styles.icon} />
                          ) : (
                            <BsFillEyeSlashFill className={styles.icon} />
                          )}
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className={styles.subrem}>
                        <input type="checkbox" className={styles.check} />
                        <p className={styles.acc}>Remember me</p>
                      </div>

                      <div className={styles.subrem}>
                        <Link href={`/auth/reset`} className={styles.link}>
                          <p className={styles.sign}>Forgot Password</p>
                        </Link>
                      </div>
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        className="bg-lite text-white px-8 py-2 lg:py-3 w-full text-xs md:text-2xl lg:text-base rounded-2xl"
                        disabled={isSubmitting}
                        onClick={() => handleSubmit()}
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className={styles.acc}>Dont have an account?</p>
            <Link href={`/auth/signup`} className={styles.link}>
              <p className={styles.sign}>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComp;

// import React, { useState } from "react";
// import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useToast } from "@chakra-ui/react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios"; // Ensure axios is installed: npm install axios

// const LoginComp = () => {
//   const toast = useToast();
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     console.log(values);
//     const response = await fetch(
//       "http://backend.toprofile.com/api/v1/auth/login/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: "user@example.com",
//           password: "string",
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("response", data);
//     console.log("message", data.status);

//     if (data.message === "success") {
//       console.log(data.status);
//       console.log(data.data.access);
//       localStorage.setItem("token", data.data.access);
//       const token = localStorage.getItem("token");
//       console.log("token", token);

//       toast({
//         title: "Login Successful",
//         description: "You have successfully logged in.",
//         status: "success",
//         position: "top",
//         duration: 5000,
//         isClosable: true,
//       });
//       router.push("/admin/dashboard");
//     } else {
//       toast({
//         title: "Authentication Failed",
//         description: data.message || "Login Failed.",
//         status: "error",
//         position: "top",
//         duration: 5000,
//         isClosable: true,
//       });
//     }

//     setSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         <Formik
//           initialValues={{
//             email: "",
//             password: "",
//           }}
//           validationSchema={Yup.object({
//             email: Yup.string()
//               .email("Invalid email address")
//               .required("Email is required"),
//             password: Yup.string()
//               .min(6, "Password should be at least 6 characters")
//               .required("Password is required"),
//           })}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="flex flex-col gap-4" autoComplete="off">
//               {/* Email Field */}
//               <div className="flex flex-col">
//                 <Field
//                   className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                   placeholder="Email"
//                   type="email"
//                   name="email"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="flex flex-col relative">
//                 <Field
//                   className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 w-full"
//                   placeholder="Password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                 />
//                 <div
//                   className="absolute right-3 top-3 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center">
//                   <Field type="checkbox" name="remember" className="mr-2" />
//                   Remember me
//                 </label>
//                 <Link href="/auth/reset" className="text-blue-500 text-sm">
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Logging in..." : "Login"}
//               </button>
//             </Form>
//           )}
//         </Formik>

//         {/* Signup Link */}
//         <div className="mt-4 text-center">
//           <p className="text-sm">
//             Don't have an account?{" "}
//             <Link href="/auth/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginComp;
