"use client"
import React, { useEffect, useRef, useState } from 'react';
// import styles from './footer.module.css'
import Image from 'next/image'
import logo from '../../../../public/img/jj.png'
import { BsInstagram } from 'react-icons/bs'
import Link from 'next/link'
import { IoMail } from "react-icons/io5";
import { FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [address] = useState("Suite 46-47, Vicbalkon Towers, Utako, Abuja");
  const currentYear = new Date().getFullYear(); 

  const handleAddressClick = () => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const details = [
    { id: 1, icon: <a href="https://www.instagram.com/toprofile_rel?igsh=YXZ0ZmM4a3dwenN1" target="_blank" rel="noopener noreferrer"><BsInstagram className='text-white h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
    { id: 2, icon: <a href="mailto:info@toprofile.com" target="_blank" rel="noopener noreferrer"><IoMail className='text-white h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
    { id: 3, icon: <a href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7" target="_blank" rel="noopener noreferrer"><FaTwitter className='text-white h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
    { id: 4, icon: <a href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7" target="_blank" rel="noopener noreferrer"><FaFacebook className='text-white h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5' /></a> },
  ];

  return (
    <div className='bg-blc'>
      <div className='flex flex-col lg:flex-row px-10 py-5 md:py-10 md:px-16 lg:px-20 xl:px-30 gap-6 md:gap-10 lg:gap-2'>
        <div className='flex-1'>
          <Image src={logo} alt='logo-img' className='w-[50%] lg:w-[70%] xl:w-[50%]' />
          <p className='text-white text-xs md:text-2xl lg:text-sm w-[100%] lg:w-[70%] xl:w-[70%] font-light pt-3 leading-5 md:leading-9 lg:leading-6 xl:leading-6'>
            Toprofile Real Estate Limited (RC: 6900425) is passionate about helping to empower families by providing them safe and prosperous communities to live or do businesses in.
          </p>
          <div className='flex items-center gap-2 md:gap-4 pt-3 md:pt-8 lg:pt-5'>
            {details.map((d) => (
              <div key={d.id} className='flex items-center'>
                <p>{d.icon}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex-1 lg:flex-2'>
          <div className='flex flex-col gap-2 md:gap-4 lg:gap-2'>
            <p className='text-white text-xs md:text-2xl lg:text-base font-light'>Subscribe to Newsletter</p>
            <div className='border-none bg-white px-4 py-2 md:py-4 lg:py-2 xl:py-3 flex items-center justify-between rounded-full'>
              <input type="text" placeholder='Enter Your Email Address' className='border-none outline-none text-xs md:text-2xl lg:text-base w-full py-1 md:py-2' />
              <button type="submit" className='bg-orange rounded-2xl md:rounded-3xl text-white px-4 md:px-8 py-1 md:py-2 text-xs md:text-2xl lg:text-base'>
                Send
              </button>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 pt-5 md:pt-10 gap-y-4 md:gap-y-10'>
            <div>
              <p className='text-white text-sm md:text-2xl lg:text-base font-normal'>QUICK LINKS</p>
              <div className='flex flex-col gap-2 md:gap-4 lg:gap-2 pt-3'>
                <Link href="/"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Home</p></Link>
                <Link href="/about"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>About Us</p></Link>
                <Link href="/services"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Services</p></Link>
                <Link href="/contact"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Contact</p></Link>
              </div>
            </div>

            <div>
              <p className='text-white text-sm md:text-2xl lg:text-base font-normal'>INFORMATION</p>
              <div className='flex flex-col gap-2 md:gap-4 lg:gap-2 pt-3'>
                <Link href="/termsofuse"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Terms of Services</p></Link>
                <Link href="/privacypolicy"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Privacy Policy</p></Link>
                <Link href="/"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Return & Refund Policy</p></Link>
                <Link href="/contact"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>Contact</p></Link>
              </div>
            </div>

            <div>
              <p className='text-white text-sm md:text-2xl lg:text-base font-normal'>CONTACT</p>
              <div className='flex flex-col gap-2 md:gap-4 lg:gap-2 pt-3'>
                <Link href="mailto:info@toprofile.com"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'>info@toprofile.com</p></Link>
                <Link href="tel:+2347012488242"><p className='text-white text-xs md:text-2xl lg:text-sm font-light'> +234&nbsp;706&nbsp;067&nbsp;9005</p></Link>
                <div className='cursor-pointer' onClick={handleAddressClick}>
                  <p className='text-white text-xs md:text-2xl lg:text-sm font-light'>{address}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='text-brw'><hr /></div>
      <div className='py-5 flex justify-center items-center'>
        <p className='text-white text-xs md:text-2xl lg:text-sm xl:text-base'>
          Copyright © {currentYear} Toprofile
        </p>
      </div>
    </div>
  )
}

export default Footer;
