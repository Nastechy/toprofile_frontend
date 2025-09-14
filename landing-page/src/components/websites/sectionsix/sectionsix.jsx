"use client"

import React, { useState } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'




const Sectionsix = () => {

    const [address] = useState("Suite 47, Vicbalkon Towers, Plot C44, Utako District.");

    const handleAddressClick = () => {
        const encodedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };

    const sendToWhatsApp = (values) => {
        const phoneNumber = "+23437305635"; // Your WhatsApp phone number
        const message = `Name: ${values.name}\nEmail: ${values.email}\nMessage: ${values.message}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };


    return (
        <div className='pt-8 md:pt-20 xl:pt-20' id='contact'>
            <div className='flex justify-center items-center gap-2'>
                <div className='border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl'> </div>
                <div className='border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl'> </div>
                <div>
                    <p className='text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl'>CONTACT US</p>

                </div>
            </div>


            <div className='flex flex-col lg:flex-row gap-2 lg:gap-0 px-10 py-8 md:py-14  lg:py-12 xl:py-16 lg:px-20 xl:px-30 '>
                <div className=' flex-1 '>
                   
                    <div className='bg-lite text-white px-5 py-10 md:px-10 md:py-14 lg:p-10 flex flex-col gap-2 md:gap-8 lg:gap-6'>
                    <p className='text-sm md:text-2xl lg:text-lg xl:text-xl font-light'>LETS TALK</p>
                    <p className='text-xl md:text-4xl lg:text-2xl xl:text-3xl font-semibold'>Speak With Our <br className='hidden lg:block' /> Expert.</p>
                   
                    <Link href="tel:+2347060679005">
                    <div className='flex items-center  gap-2  md:gap-4 lg:gap-2 w-full'>
                        <div className='bg-white h-8 w-8 md:h-14 md:w-14 lg:h-12 lg:w-12 xl:w-14 xl:h-14 flex items-center justify-center rounded-full'>
                            <IoCallOutline className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:w-8 xl:h-8 ' />
                        </div>
                        <p className='text-xs md:text-2xl lg:text-base text-white w-[80%]'>+2347060679005</p>
                    </div>
                    </Link>
                    <Link href="mailto:Info@toprofile.com" >
                    <div className='flex items-center  gap-2  md:gap-4 lg:gap-2 w-full'>
                        <div className='bg-white  h-8 w-8 md:h-14 md:w-14 lg:h-12 lg:w-12 xl:w-14 xl:h-14 flex items-center justify-center rounded-full'>
                            <MdOutlineMessage className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:w-8 xl:h-8 ' />
                        </div>
                        <p className=' text-xs md:text-2xl lg:text-base text-white w-[80%]'>Info@toprofile.com</p>
                    </div>
                    </Link>

                    <div className='flex items-center gap-2  md:gap-4 lg:gap-2 w-full cursor-pointer' onClick={handleAddressClick}>
                        <div className='bg-white  h-8 w-8 md:h-14 md:w-14 lg:h-12 lg:w-12 xl:w-14 xl:h-14 flex items-center justify-center rounded-full'>
                            <IoLocationSharp className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6xl:w-8 xl:h-8 ' />
                        </div>

                        <p className='text-xs md:text-2xl lg:text-base text-white w-[80%] lg:w-[80%] '>{address}</p>
                    </div>
                    </div>
                </div>
                <div className='flex-1 xl:flex-2 '>
                  <div className='px-5 py-10 md:px-10 md:py-14 lg:p-10'>
                  <p className='text-sm md:text-2xl lg:text-lg xl:text-xl font-normal '>FILL THE FORM BELOW</p>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            message: '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Name is required'),
                            email: Yup.string().required('Email is required'),
                            message: Yup.string().required('Service needed is required'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            sendToWhatsApp(values);
                            resetForm();
                            setSubmitting(false);
                        }}
                    >
                        <Form className='flex flex-col gap-4 md:gap-8 lg:gap-5 xl:gap-8 py-5' autoComplete='off'>
                            <div className='flex flex-col gap-2'>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className='outline-none bg-gray text-slate-600 px-2 py-2 md:py-4 lg:py-2 text-xs md:text-2xl lg:text-base  focus-visible:border-slate-900'


                                />
                                <ErrorMessage name="name" component="div" className="text-red-600 text-xs md:text-xl lg:text-sm" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className='outline-none bg-gray text-slate-600  px-2 py-2 md:py-4  lg:py-2   text-xs md:text-2xl lg:text-base  focus-visible:border-slate-900'


                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-xs md:text-xl lg:text-sm" />
                            </div>

                            <div className='flex flex-col gap-2 text-gray-500 pt-2'>

                                <Field
                                    as="textarea"
                                    rows="4"
                                    cols="50"
                                    placeholder="Write Your Message"
                                    name="message"
                                    className='text-xs md:text-2xl lg:text-base bg-gray px-2 py-2 md:py-4 lg:py-2  outline-none w-full '
                                    style={{ width: '100%' }} // Set width to 100%
                                />
                                <ErrorMessage name="message" component="div" className="text-red-600 text-xs md:text-xl lg:text-sm" />
                            </div>


                            <div className='flex items-center justify-center lg:justify-start' >
                                <button
                                    type="submit"
                                    className='bg-lite text-white px-8 py-2 lg:py-4 w-full md:w-[60%] lg:w-[60%] xl:w-[30%]  text-xs md:text-2xl lg:text-base '
                                >
                                    SUBMIT NOW
                                </button>
                            </div>
                        </Form>
                    </Formik>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Sectionsix