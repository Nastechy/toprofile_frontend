"use client"

import React, { useEffect, useState } from 'react';
import styles from './sectionone.module.css'
import Header from '../header/header'
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {

  useEffect(() => {
    AOS.init({
      duration: 100, // Set the duration to 500ms (0.5 seconds)
    });
  }, []);

  const [address] = useState("Suite 47, Vicbalkon Towers, Plot C44, Utako District.");

  const handleAddressClick = () => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [messageIconPosition, setMessageIconPosition] = useState({ top: 0, left: 0 });

  const toggleWhatsApp = () => {
    setShowWhatsApp(!showWhatsApp);
    setShowCall(false); // Close call icon when WhatsApp icon is toggled
    setMessageIconPosition({ top: 0, left: 0 }); // Reset message icon position
  };

  const toggleCall = () => {
    setShowCall(!showCall);
    setShowWhatsApp(false); // Close WhatsApp icon when call icon is toggled
    setMessageIconPosition({ top: 0, left: 0 }); // Reset message icon position
  };

  const toggleMessage = (event) => {
    event.preventDefault(); // Prevent default action
    setShowWhatsApp(!showWhatsApp); // Toggle WhatsApp icon
    setShowCall(!showCall); // Toggle call icon
    const rect = event.target.getBoundingClientRect(); // Get position of the clicked icon
    setMessageIconPosition({
      top: rect.top + window.scrollY + 10, // Adjust top position as per your requirement
      left: rect.left + window.scrollX + 10 // Adjust left position as per your requirement
    });
  };

  return (
    <div className={styles.main}>
      <Header />
      <div className='flex flex-col px-8 md:px-16 pt-12 pb-10 md:pt-20 md:pb-16 lg:px-20 xl:px-30 lg:pt-28 lg:pb-20 xl:pt-40 xl:pb-32 text-white' >
        <div className='w-[90%] md:w-[80%] lg:w-[60%] xl:w-[70%] '>
          <div data-aos='fade-up' data-aos-delay='300' data-aos-duration='800'>
            <p className='font-semibold leading-10 text-2xl md:text-5xl xl:text-6xl md:leading-relaxed xl:leading-relaxed '>Welcome To Toprofile <br className='hidden lg:block' /> Real Estate Limited</p>
            <p className='mt-2 text-xs md:text-2xl lg:text-xl xl:text-xl md:mt-6 font-light leading-relaxed md:leading-10 lg:leading-relaxed xl:leading-loose lg:mt-2 '>Unlock the Door to Your Perfect Home,<br className='block lg:hidden' />  Join us in the pursuit <br className='hidden xl:block' /> of Realty For Royalty.</p>
            <div className="mt-4 ">
            </div>
            <Link href={`/projects`}>
              <button className='flex justify-between items-center gap-4 border border-orange text-white text-xs md:text-xl lg:text-base xl:text-lg p-2 md:p-4'>
                VIEW OUR PROJECTS
                <div className='bg-white h-5 w-5 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:h-7 xl:w-7 flex items-center justify-center rounded-full'>
                  <IoIosArrowForward className='text-orange h-4 w-4 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6' />
                </div>
              </button>
            </Link>
          </div>


        </div>


        <div className={`${styles.fixedMessageContainer}`}>
          <div className='flex flex-col justify-items-end items-end  w-full pt-[80px] md:pt-[100px] gap-2 md:gap-4'>
            {showCall &&
              <Link href="tel:+2347060679005">
                <div className='bg-lite flex justify-center items-center rounded-full h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 xl:h-16 xl:w-16'>
                  <MdCall className='text-white h-6 w-6 md:w-10 md:h-10 lg:w-8 lg:h-8 xl:h-10 xl:w-10' />
                </div>
              </Link>
            }
            {showWhatsApp &&
              <Link href="https://wa.me/message/SPYDZQEVY2DVC1">
                <div className='bg-lite flex justify-center items-center rounded-full h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 xl:h-16 xl:w-16'>
                  <IoLogoWhatsapp className='text-white h-6 w-6 md:w-10 md:h-10 lg:w-8 lg:h-8 xl:h-10 xl:w-10' />
                </div>
              </Link>
            }
            <div className='bg-lite flex justify-center items-center rounded-full h-10 w-10 md:h-20 md:w-20 lg:h-14 lg:w-14 xl:h-16 xl:w-16' onClick={toggleMessage}>
              <MdOutlineMessage className='text-white h-6 w-6 md:w-10 md:h-10 lg:w-8 lg:h-8 xl:h-10 xl:w-10 ' />
            </div>
          </div>
        </div>

      </div>
      <div className={styles.submain}>
        <div className={styles.subsub} onClick={handleAddressClick}>
          <IoLocationSharp className='text-orange h-5 w-5 md:h-10 md:w-10 lg:h-9 lg:w-9 xl:w-8 xl:h-8' />
          <p className='text-xs md:text-2xl lg:text-base w-[80%] xl:w-[50%] '>{address}</p>
        </div>
        <div className={styles.subsubsub}>
          <div className='flex items-center  gap-4 md:gap-8 lg:gap-4 w-full'>
            <IoMail className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:w-7 xl:h-7 ' />
            <Link href="mailto:info@toprofile.com">
              <div className='flex flex-col '>
                <p className='text-xs md:text-2xl lg:text-base  text-slate-500 font-200'>Contact</p>
                <p className='text-xs md:text-2xl lg:text-base text-black font-200'>info@toprofile.com</p>
              </div>
            </Link>

          </div>
          <div className='flex lg:items-center  gap-4 md:gap-8 lg:gap-4 w-full'>
            <IoCallOutline className='text-orange h-4 w-4 md:h-8 md:w-8 lg:h-6 lg:w-6 xl:w-7 xl:h-7' />
            <Link href="tel:+2347060679005">
              <div className='flex flex-col '>
                <p className='text-xs md:text-2xl lg:text-base  text-slate-500 font-200'>Contact</p>

                <p className='text-xs md:text-2xl lg:text-base  text-black font-200'>+2347060679005</p>

              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
