"use client"
import React, { useState,useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from './navbar.module.css';
import Logo from '../../../../public/img/kk.png'
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosMenu } from 'react-icons/io';
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuContent, setShowMenuContent] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPraticeDropdownOpen, setIsPraticeDropdownOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsSticky(true);
        setIsScrolling(true);
      } else {
        setIsSticky(false);
        setIsScrolling(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePraticeDropdownToggle = () => {
    setIsPraticeDropdownOpen(!isPraticeDropdownOpen)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowMenuContent(!showMenuContent);
  };


  return (
   <div className={`${styles.header} ${isSticky ? styles.sticky : ''} ${isScrolling ? styles.scrolling : ''}`}>
    <div className=' flex flex-row items-center justify-between  lg:justify-center lg:gap-10 py-2 pr-10 md:py-4 md:pr-20 lg:py-2 lg:pr-10 xl:pr-28 2xl:pr-3 '>
      <div className='flex-1 lg:flex-[0.7] flex items-center justify-between'>
        <div className=''>
          <Image src={Logo} alt='logo-img' className='w-[80%] lg:w-[70%] xl:w-[50%]' />
        </div>

      </div>
      <div className='flex-1 lg:flex-none flex justify-end items-center '>
        <button onClick={handleMenuClick} className="text-white">
          {/* Using IoIosMenu icon */}
          <IoIosMenu className={styles.menuicon} />
        </button>
      </div>

      {/* MOBILE VIEW */}

      {showMenuContent && (
        <div className={styles.mobilelistcont}>
          <ul className={styles.mobilelist}>
            <Link href={`/`} className='hover:text-orange'>
              <li className="text-center  text-xs md:text-xl lg:text-sm xl:text-base py-1">HOME</li>
            </Link>
            <Link href={`/about`} className='hover:text-orange'>
              <li className="py-1 text-center  text-xs md:text-xl lg:text-sm xl:text-base">ABOUT US</li>
            </Link>

            {/* <div className='flex flex-col gap-1' onClick={handlePraticeDropdownToggle}>
              <div className='flex items-center justify-center gap-1 hover:text-orange'>
                <li className='pt-1  text-xs md:text-lg lg:text-sm xl:text-base'>ABOUT US</li>
                <IoIosArrowDown className='text-orange'/>
              </div>
              {isPraticeDropdownOpen && (
                <div className=" text-sm ">
                  <ul className='text-xs md:text-lg lg:text-sm xl:text-base flex flex-col py-[0.3px] gap-1 text-slate-400'>
                    <Link href={`/teams`} className='hover:text-orange'>
                      <div className='flex items-center  justify-center gap-1 hover:text-orange'>
                        <li className='hover:text-orange'>OUR TEAM</li>
                      </div>
                    </Link>
                   
                  </ul>
                </div>
              )}
            </div> */}
            <Link href={`/teams`} className='hover:text-orange'>
              <li className="py-1 text-center  text-xs md:text-xl lg:text-sm xl:text-base">OUR TEAMS</li>
            </Link>
            <div className='flex flex-col gap-1' onClick={handleDropdownToggle}>
                <div className='flex items-center justify-center gap-1 hover:text-orange'>
                  <li className='py-1  text-xs md:text-xl lg:text-sm xl:text-base cursor-pointer'>PAGES</li>
                  <IoIosArrowDown className={`${styles.dropdownIcon} ${isSticky ? styles.orangeIcon : ''}`} />
                </div>
                {isDropdownOpen && (
                  <div className=" text-sm">
                    <ul className=' text-xs md:text-xl lg:text-sm xl:text-base flex flex-col py-[0.3px]  gap-1 text-slate-400 '>
                      <Link href={`/blogs`} className='hover:text-orange'>
                        <div className='flex items-center justify-center gap-1 hover:text-orange'>
                          <li>BLOGS</li>
                        </div>
                      </Link>
                      <Link href={`/termofservice`} className='hover:text-orange'>
                        <div className='flex items-center justify-center gap-1 hover:text-orange'>
                        <li>TERMS OF SERVICES</li>
                        </div>
                      </Link>
                      <Link href={`/privacypolicy`} className='hover:text-orange'>
                        <div className='flex items-center justify-center gap-1 hover:text-orange'>
                        <li>PRIVACY POLICY</li>
                        </div>
                      </Link>
                    </ul>

                  </div>
                )}
              </div>

            <Link href="#contact" className='hover:text-orange'>
              <div className='flex items-center justify-center gap-1'>
                <li className='py-1  text-center  text-xs md:text-xl lg:text-sm xl:text-base'>CONTACT</li>
                {/* <IoIosArrowDown className='text-orange' /> */}
              </div>
            </Link>
           
            <Link href={`/projects`} className='hover:text-orange'>
              <div className="flex justify-center items-center  lg:hidden pt-1 ">
                <button className=' bg-orange text-white text-xs md:text-lg lg:text-sm xl:text-base px-4 py-2'>VIEW OUR PROJECT</button>
              </div>
            </Link>

          </ul>
        </div>
      )}





      {/* DESKTOP VIEW */}
      <div className=' flex items-center justify-between gap-8'>

        <div className=" flex-1 hidden lg:flex items-center justify-between ">
          {/* Always render menu items for desktop screens */}
          <div className=''>
            <ul className={`text-black text-xs md:text-lg lg:text-sm xl:text-base flex flex-col lg:flex-row lg:gap-4 xl:gap-8`}>
              <Link href={`/`} className='hover:text-orange'>
                <li className="">HOME</li>
              </Link>
              <Link href={`/about`} className='hover:text-orange'>
                <li className="">ABOUT US</li>
              </Link>
             
              {/* <div className='flex flex-col gap-2' style={{ position: 'relative', whiteSpace: 'nowrap' }} onClick={handlePraticeDropdownToggle}>
                <div className='flex items-center gap-1 hover:text-orange cursor-pointer'>
                  <li>ABOUT US</li>
                  <IoIosArrowDown  className={`${styles.dropdownIcon} ${isSticky ? styles.orangeIcon : ''}`} />
                </div>
                <div>
                  {isPraticeDropdownOpen && (
                    <div className="text-sm bg-white rounded-lg text-orange" style={{ position: 'absolute', top: '100%', left: 0 }}>
                    <ul className='text-xs md:text-xl lg:text-sm xl:text-sm flex flex-col  gap-1 pt-2 w-[100%] px-3 py-3 shadow-2xl' >
                      <Link href={`/teams`} className='hover:text-orange'>
                        <div className='flex items-center justify-between gap-1 hover:text-orange'>
                          <li>OUR TEAM</li>
                        </div>
                      </Link>
                    </ul>
                  </div>
                  )}
                </div>
              </div> */}
              <Link href={`/teams`} className='hover:text-orange'>
                <li>OUR TEAMS</li>
              </Link>
              <div className='flex flex-col gap-1' style={{ position: 'relative', whiteSpace: 'nowrap' }} onClick={handleDropdownToggle}>
                <div className='flex items-center gap-1 hover:text-orange cursor-pointer'>
                  <li>PAGES</li>
                  <IoIosArrowDown  className={`${styles.dropdownIcon} ${isSticky ? styles.orangeIcon : ''}`} />
                </div>
                {isDropdownOpen && (
                  <div className="text-sm bg-white text-orange rounded-lg " style={{ position: 'absolute', top: '100%', left: 0 }}>
                    <ul className='text-xs md:text-xl lg:text-sm xl:text-sm flex flex-col gap-1  w-[100%] px-3 py-3 shadow-2xl' >
                      <Link href={`/blogs`} className='hover:text-orange'>
                        <div className='flex items-center justify-start gap-1 hover:text-orange'>
                          <li>BLOGS</li>
                        </div>
                      </Link>
                      <Link href={`/termofservice`} className='hover:text-orange'>
                        <div className='flex items-center justify-start gap-1 hover:text-orange'>
                          <li>TERMS OF SERVICES</li>
                        </div>
                      </Link>
                      <Link href={`/privacypolicy`} className='hover:text-orange'>
                        <div className='flex items-center justify-start gap-1 hover:text-orange'>
                          <li>PRIVACY POLICY</li>
                        </div>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>

              <Link href="#contact" className='hover:text-orange'>
                <div className='flex items-center gap-1'>
                  <li>CONTACT</li>
                
                </div>
              </Link>

            

            </ul>
          </div>

        </div>
        <Link href={`/projects`}>
        <div className="hidden lg:block ">
          <button className='bg-orange text-white text-xs md:text-lg lg:text-sm xl:text-base p-2 lg:px-8 lg:py-4'>VIEW OUR PROJECT</button>
        </div>
        </Link>
      </div>

    </div>
    </div>
  )
}

export default Navbar