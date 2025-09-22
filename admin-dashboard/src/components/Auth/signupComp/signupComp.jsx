"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

import styles from "./signupcomp.module.css";
import Bgg from "../../../../public/img/bgg.jpeg";
import bg from "../../../../public/img/to.png";
import { URL } from "@/components/utils/client";

const SignupComp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${URL}/auth/sign-up/`,
        {
          username: values.username,
          email: values.email,
          phonenumber: values.phone, // Phone number included in the payload
          password: values.password,
        }
      );
      console.log(response)
      if (response.status === 201) {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/login"); // Redirect after successful registration
      } else {
        toast({
          title: "Authentication Failed",
          description: "Signup Failed.",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "An error occurred during authentication.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="flex-1">
        <Image
          src={Bgg}
          className="h-screen w-full"
          alt="bgg-img"
        />
      </div>
      <div className="flex-1 bg-white flex items-center justify-center py-10">
        <div className="flex flex-col justify-center gap-5 md:gap-10 lg:gap-5">
          <div className="flex justify-center items-center">
            <Image
              src={bg}
              className="w-[30%] md:w-[50%] lg:w-[30%]"
              alt="bg-img"
              // width={10}
              // height={10}
            />
          </div>
          <div>
            <p className="text-base md:text-3xl lg:text-xl xl:text-2xl font-bold text-center">
              Create an account to continue
            </p>
          </div>
          <div className="flex justify-center px-5 py-3 md:px-20 md:py-10">
            <div className="w-[80%]">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  phone: "", // Phone number field
                  password: "",
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Field cannot be empty"),
                  username: Yup.string().required("Field cannot be empty"),
                  phone: Yup.string().required("Field cannot be empty"), // Phone number validation
                  password: Yup.string()
                    .min(6, "Password should be at least 6 characters")
                    .required("Field cannot be empty"),
                })}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-4" autoComplete="off">
                    <div className="flex flex-col gap-2 text-gray-500">
                      <Field
                        className="w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl px-2 py-2 md:py-3 lg:py-2 text-xs md:text-2xl lg:text-base focus-visible:border-slate-400"
                        placeholder="Username"
                        type="text"
                        name="username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>

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
                      <Field
                        className="w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl px-2 py-2 md:py-3 lg:py-2 text-xs md:text-2xl lg:text-base focus-visible:border-slate-400"
                        placeholder="Phone Number"
                        type="text"
                        name="phone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs md:text-xl lg:text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2 text-gray-500">
                      <div className="flex justify-between items-center w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl px-2 py-2 md:py-3 lg:py-2 text-xs md:text-2xl lg:text-base focus-visible:border-slate-400">
                        <Field
                          className="outline-none bg-transparent"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                        />
                        <div
                          className="text-lite"
                          onClick={togglePasswordVisibility}
                        >
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
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className={styles.acc}>Already have an account?</p>
            <Link href={`/auth/login`} className={styles.link}>
              <p className={styles.sign}>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupComp;
