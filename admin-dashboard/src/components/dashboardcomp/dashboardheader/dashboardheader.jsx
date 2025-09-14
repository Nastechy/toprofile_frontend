"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import logone from '../../../../public/img/to.png'
import Link from 'next/link'
import { BiLogOut, BiLogOutCircle, BiNotification, BiSolidToggleRight, BiUserCircle } from 'react-icons/bi'
import { BsArrowUp } from 'react-icons/bs'
import { FaArrowUp, FaHamburger } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { MdOutlineKeyboardArrowDown, MdWeb } from 'react-icons/md'
import styles from './dashboardheader.module.css'
import { AiFillWeiboCircle, AiOutlineUser } from 'react-icons/ai'
import { TbWorld } from 'react-icons/tb'
// import { getRequest } from '@/library/request'
// import axios from 'axios';

import Dropdown from '../Dropdown/dropdown'


const DashboardHeader = () => {


  return (

    <div className={styles.main}>
     <p>Counselor Registration</p>

      <div className={styles.contwo}>

      </div>
      <div className={styles.conthree}>
        <Link href={`/`}>
          <div className={styles.divone}>
            <TbWorld color='orange' className={styles.icon} />
            <p className='text-red-300'>View Website</p>
          </div>
        </Link>
        <div className={styles.divone}>

          <Dropdown />
        </div>

      </div>
    </div>
  )
}

export default DashboardHeader;