"use client"
import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image'
import Male from '../../../../public/img/man.png'
import pp from '../../../../public/img/pp.jpeg'
import oche from '../../../../public/img/oche.jpeg'
import mark from '../../../../public/img/mark.jpeg'
import { FaFacebookF, FaGooglePlusG, FaYoutube } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineGooglePlus } from 'react-icons/ai'
import { GrLinkedinOption } from 'react-icons/gr'
import Link from 'next/link'
import { IoMail } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Sectionfive = () => {


    const scrollTriggerRef = useRef(null);

  useEffect(() => {
      AOS.init();
      const options = {
          threshold: 0.2,
      };
      const observer = new IntersectionObserver(handleScroll, options);
      observer.observe(scrollTriggerRef.current);

      return () => {
          observer.disconnect();
      };
  }, []);

  const handleScroll = (entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              AOS.refresh();
          }
      });
  };




    const details = [
        {
            id: 1,
            pic: pp,
            label: "Prosper T. Nwankwo (MBA)",
            position: "Managing Director",
            social: [
                { icon: <a href="https://www.instagram.com/tcprosper?igsh=YmxzZ2o0YmkyenZj" target="_blank" rel="noopener noreferrer"><BsInstagram className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://www.linkedin.com/in/tochukwu-prosper-2018" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className='text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://x.com/prospertc?t=WARmYrPldbJe39gdelbTLw&s=09" target="_blank" rel="noopener noreferrer"><FaTwitter className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://www.facebook.com/prospertc.nwankwo" target="_blank" rel="noopener noreferrer"><FaFacebook className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
            ]
        },
        {
            id: 2,
            pic: oche,
            label: "Oche R. Anya",
            position: "General Manager",
            social: [
                { icon: <a href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng==" target="_blank" rel="noopener noreferrer"><BsInstagram className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className='text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7" target="_blank" rel="noopener noreferrer"><FaTwitter className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7" target="_blank" rel="noopener noreferrer"><FaFacebook className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
            ]
        },
        {
            id: 3,
            pic: mark,
            label: "Mark Ekene Ogba",
            position: "HR Business Partner",
            social: [
                { icon: <a href=" https://www.instagram.com/markemma489" target="_blank" rel="noopener noreferrer"><BsInstagram className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href=" https://www.linkedin.com/in/ogba-ekene03" target="_blank" rel="noopener noreferrer"><FaLinkedinIn className='text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href="https://x.com/ekene_ogba" target="_blank" rel="noopener noreferrer"><FaTwitter className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
                { icon: <a href=" https://www.facebook.com/Ekenedirichukwu03" target="_blank" rel="noopener noreferrer"><FaFacebook className='text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
            ]
        }
    ]



    return (
        <div className='py-10 md:py-20 xl:py-16 '  data-aos='flip-right'
        data-aos-easing='ease-out-cubic'
     data-aos-duration='2000'
     ref={scrollTriggerRef}>
            <div className='flex justify-center items-center gap-2'>
                <div className='border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl'> </div>
                <div className='border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl'> </div>
                <div>
                    <p className='text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl'>MANAGEMENT TEAM</p>

                </div>
            </div>
            <div className='flex items-center justify-center pt-2 pb-5 md:pt-4 md:pb-14 lg:pt-5 lg:pb-10'>
                <p className='text-center w-[85%] md:w-[90%] lg:w-[70%] xl:w-[50%] text-xs md:text-2xl lg:text-lg xl:text-xl font-light'>We believe in the power of expertise, dedication, and passion. Meet the driving force behind our success.</p>
            </div>
            <div className='grid lg:grid-cols-3 gap-10 md:gap-16  px-10 py-8 md:py-10 lg:py-3 xl:py-10 lg:px-20 xl:px-30'>
                {
                    details.map((datum) => (
                        <div key={datum.id} className='flex flex-col items-center gap-1 md:gap-2 '>
                          <div className=''>
                          <Image src={datum.pic} alt='pic-img' className='w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[200px] lg:h-[200px] xl:w-[300px] xl:h-[300px] rounded-full' />
                          </div>
                            <p className='text-sm md:text-2xl lg:text-sm xl:text-base font-medium'>{datum.label}</p>
                            <p className=' text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light text-orange'>{datum.position}</p>
                            <div className='flex flex-row gap-4 '>
                                {datum?.social?.map((item) => (
                                  <div key={item.id} className='bg-white shadow-xl flex items-center justify-center rounded-full h-6 w-6 md:h-12 md:w-12 lg:h-8 lg:w-8 xl:h-10 xl:w-10'>
                                      <p key={item.id} className='flex flex-row'>{item.icon}</p>
                                  </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Sectionfive