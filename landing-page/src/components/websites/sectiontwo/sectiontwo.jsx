"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './sectwo.module.css'
import { IoIosArrowForward } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';




const Sectiontwo = () => {
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



  return (
   <div className='bg-gray px-10 py-10  md:py-20 lg:px-20 xl:px-30'  data-aos='flip-left'
   data-aos-easing='ease-out-cubic'
data-aos-duration='2000'
ref={scrollTriggerRef}>
    <div className='flex justify-center items-center gap-2'>
      <div className='border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl'> </div>
      <div className='border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl'> </div>
  <div>
  <p className='text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl'>ABOUT US</p>
  </div>
    </div>
     <div className={styles.main} >
      <div className={styles.subone}>
     <p className=' text-xs md:text-2xl lg:text-lg xl:w-[90%] xl:leading-loose font-light'>Toprofile Real Estate Limited (RC: 6900425) is passionate about helping to empower families by providing them safe and prosperous communities to live or do businesses in. Our employees are characterized by excellence, respect, integrity, and the ability to consistently deliver superior professional service laced with innovation. 
Every step of the way in our conversations, we keep the satisfaction of our clientele in the vanguard. We provide every necessary support to our clients, leaving them pleased and proud to recom...</p>
<div className='pt-4'>
<Link href={`/about`}>
<button className='flex justify-between items-center gap-4 border bg-orange text-white text-xs md:text-xl  lg:text-base xl:text-lg p-2 md:p-4'>
         LEARN MORE
          <div className='bg-white h-5 w-5 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-7 xl:w-7 flex items-center justify-center rounded-full'>
          <IoIosArrowForward className='text-orange h-4 w-4 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6'/>
          </div>
          </button>
</Link>
</div>
      </div>
      <div className={styles.subtwo}>
      <video controls  autoPlay  className={styles.video}>
            <source src="/img/brand.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </div>
    </div>

   </div>
  )
}

export default Sectiontwo