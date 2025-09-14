"use client"
import React, { useState } from 'react';
import styles from './resetcomp.module.css';
import { FcGoogle } from 'react-icons/fc';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Bgg from '../../../../public/img/bgg.jpeg'
import bg from '../../../../public/img/to.png'
import { BiErrorCircle } from 'react-icons/bi';
import Image from 'next/image';



const ResetComp = () => {

  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}/LoginAdmin`, {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        toast({
          title: 'Login Successful',
          description: 'You have successfully login.',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          title: 'Authentication Failed',
          description: 'Login Failed.',
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
    setSubmitting(false);
  };


  return (
    <section className='flex flex-col lg:flex-row  '>
      <div className='flex-1'>
        <Image
          src={Bgg}
          width={10}
          height={10}
          className='h-[70vh] lg:h-screen w-full'
          alt='bgg-img' />
      </div>


      <div className='flex-1 bg-white flex items-center justify-center py-10'>
        <div className='flex flex-col justify-center gap-5 md:gap-10 lg:gap-5 '>
          <div className=' flex justify-center items-center'>
            <Image
              src={bg}
              width={10}
              height={10}
              className='w-[30%] md:w-[50%] lg:w-[30%]'
              alt='bg-img' />
          </div>
          <div >
            <p className='text-base md:text-3xl lg:text-xl xl:text-2xl font-bold text-center '>Forgot Password?</p>
            <p className={styles.second}>No worries, we will send you reset instructions</p>

          </div>
          <div className='flex justify-center px-5 py-3 md:px-20 md:py-10 '>
            <div className='w-[80%]'>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Invalid email address').required('Field cannot be empty'),
                })}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values, isSubmitting }) => (
                  <Form className='flex flex-col gap-4' autoComplete='off'>


                    <div className='flex flex-col gap-2 text-gray-500'>

                      <Field
                        className='w-[100%] outline-none bg-transparent text-slate-600 border border-slate-200 rounded-xl   px-2 py-2 md:py-3  lg:py-2   text-xs md:text-2xl lg:text-base  focus-visible:border-slate-400'
                        placeholder='Email'
                        type="text"
                        name="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs md:text-xl lg:text-sm" />
                    </div>


                    <div className=''>
                      <button
                        type="submit"
                        className='bg-lite text-white px-8 py-2 lg:py-3 w-full text-xs md:text-2xl lg:text-base rounded-2xl'
                        disabled={isSubmitting}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

          </div>
          <div className='flex justify-center items-center gap-2'>
            <p className={styles.acc}>Back to</p>
            <Link href={`/auth/login`} className={styles.link}>
              <p className={styles.sign}>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetComp;
