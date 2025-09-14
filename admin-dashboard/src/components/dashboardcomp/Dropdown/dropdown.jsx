import React, {useEffect,useState} from 'react';
import kiz from '../../../../public/img/kiz.png'
import { MdEventRepeat, MdOutlineKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { FaUserCircle } from "react-icons/fa";
// import axios from 'axios';
// import { getRequest } from '@/library/request'
import { BiLogOut, BiLogOutCircle, BiNotification, BiSolidToggleRight, BiUserCircle } from 'react-icons/bi'
import Link from 'next/link';
import Image from 'next/image';
import { BsFillPeopleFill } from "react-icons/bs";
import { TbMessageChatbot } from "react-icons/tb"
import { IoIosNotificationsOutline } from "react-icons/io";




const Dropdown = ({counter}) => {
  const [details, setDetails] = useState({ userName: '', email: '' });
  const [id, setId] = useState(1); // Set the initial value of id




    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    // logout
 
    

      


    
  return (
    <div className="relative flex justify-end">
          <div className="">
          
            <span className="rounded-md shadow-sm">
              <button
                type="button"
                className="flex items-center text-blue gap-0 md:gap-1 px-1 py-1 md:py-2 md:px-2 lg:py-1 text-sm md:text-medium lg:text-max xl:text-medium transition duration-150 ease-in-out hover:text-bluehover:bg-blue rounded-lg focus:outline-none focus:border-blue  focus:shadow-outline-indigo"
                id="dropdown-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
               
              >
           <div className='bg-gray flex items-center justify-center rounded-full  h-6 w-6 xl:h-8 xl:w-8  '>
           < BsFillPeopleFill className='text-lite  h-4 w-4 xl:h-6 xl:w-6' />
           </div>
              
               <p id="dropdown-menu-button"
                
                 className="text-xs  md:text-xl lg:text-sm xl:text-base text-bll">Admin</p>
               <MdKeyboardArrowDown className='w-4 h-4 md:w-8 md:h-8 lg:h-4 lg:w-4 xl:h-5 xl:w-5 text-bll'  onClick={toggleDropdown}  />
              </button>
            </span>
          </div>

          {isOpen && (
            <div className=" absolute top-14 right-0 mt-2  rounded-md shadow-2xl w-[100%]">
              <div className="rounded-md bg-white shadow-xs text-blu">
                <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-menu-button">
                 
                  <a
                    href="#"
                    className="flex justify-start items-center gap-2 hover:bg-blue  px-4 py-2 text-sm md:text-medium lg:text-max xl:text-medium text-blue hover:bg-bll hover:text-lite"
                    role="menuitem"
                  >
                    <FaUserCircle />
                   <p className="text-sm  md:text-large xl:text-large">Admin</p>
                  </a>
                  <a
                    href="#"
                    className="flex justify-start items-center gap-2 hover:bg-blue  px-4 py-2 text-sm md:text-medium lg:text-max xl:text-medium hover:text-lite"
                    role="menuitem"
                    
                  >
                    <BiLogOutCircle  />
                   <p className="text-sm  md:text-large xl:text-large">Logout</p>
                  </a>

                </div>
              </div>
            </div>
          )}
        </div>

  )
}

export default Dropdown