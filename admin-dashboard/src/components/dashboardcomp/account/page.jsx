"use client"
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Page = () => {
  return (
    <div className='bg-white px-10 lg:py-10 xl:px-16 xl:py-10 '>
       
        <Formik
                    initialValues={{
                        password: '',
                        email: '',
                        facebook: '',
                        twitter: '',
                        instagram: '',
                        mail: '',
                    }}
                    validationSchema={Yup.object({
                            // Validation schema
                            password: Yup.string().required('Field cannot be empty'),
                            email: Yup.string().required('Field cannot be empty'),
                            facebook: Yup.string().required('Field cannot be empty'),
                            twitter: Yup.string().required('Field cannot be empty'),
                            instagram: Yup.string().required('Field cannot be empty'),
                            mail: Yup.string().required('Field cannot be empty'),
                        })}
                       
                >
        <Form className='flex flex-col gap-16 py-5'>
       <div className='flex flex-col gap-4'>
       <p className='text-xl xl:text-2xl'>Credentials</p>
          <div className='flex items-center w-[100%] gap-20'>

          <div className='flex flex-col gap-2 w-[40%] xl:w-[30%]'>
          <label htmlFor="email" className='text-sm  '>Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm   focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>

          <div className='flex flex-col gap-2 w-[40%] xl:w-[30%]'>
          <label htmlFor="email" className='text-sm '>Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm  focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>
          </div>
       </div>

       <div className='flex flex-col gap-4'>
       <p className='text-xl xl:text-2xl'>Socials</p>

          <div className='flex items-center w-[100%] gap-20'>
          <div className='flex flex-col gap-2  w-[40%] xl:w-[30%]'>
          <label htmlFor="facebook" className='text-sm '>Facebook</label>
            <Field
              type="facebook"
              name="facebook"
              placeholder="Post link"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm  focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="facebook" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>

          <div className='flex flex-col gap-2  w-[40%] xl:w-[30%]'>
          <label htmlFor="twitter" className='text-sm '>Twitter</label>
            <Field
              type="twitter"
              name="twitter"
              placeholder="Post link"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm   focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="twitter" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>
          </div>
          
          <div className='flex items-center w-[100%] gap-20'>
          <div className='flex flex-col gap-2  w-[40%] xl:w-[30%]'>
          <label htmlFor="instagram" className='text-sm '>Instagram</label>
            <Field
              type="instagram"
              name="instagram"
              placeholder="Post link"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm   focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="instagram" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>
          <div className='flex flex-col gap-2  w-[40%] xl:w-[30%]'>
          <label htmlFor="mail" className='text-sm '>Mail</label>
            <Field
              type="mail"
              name="mail"
              placeholder="Post link"
              className='outline-none border border-gray text-gray bg-transparent rounded px-4 py-2 text-sm   focus-visible:bg-white focus-visible:text-blu focus-visible:border-slate-400'
            />
            <ErrorMessage name="mail" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
          </div>
          </div>
       </div>

        

        
          <div className='flex items-center ' >
            <button 
              type="submit" 
              className=' bg-fad text-sm  text-white px-4 py-2  w-full lg:w-[50%] xl:w-[20%] rounded xl:text-base '
            >
             Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Page