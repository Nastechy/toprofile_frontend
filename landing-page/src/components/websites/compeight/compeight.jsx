import React from 'react'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowDropright, IoIosArrowForward } from "react-icons/io";

const Compeight = () => {
  return (
    <div className='p-14 md:p-20 lg:px-28 lg:py-10 xl:px-40 '>
    <div className='text-white flex items-center justify-center h-[15vh] md:h-[30vh] lg:h-[30vh] xl:h-[40vh]'>
        <p className='text-xl md:text-4xl lg:text-2xl xl:text-3xl font-medium xl:font-300'>BLOGS & NEWS</p>
    </div>
    {/* <div className='text-white flex flex-col lg:flex-row items-center justify-center py-5 md:py-10 gap-2 md:gap-2 '>
<div  className='flex items-center '>
<Link href={`/`} >
    <p className='text-sm md:text-2xl lg:text-lg xl:text-xl font-light '>Home</p>
</Link>

<IoIosArrowForward className='font-light ' />
</div>

<div  className='flex items-center '>
<Link href={`/contact`} >
    <p className='text-sm md:text-2xl lg:text-lg xl:text-xl font-light '>Contact Us</p>
</Link>

<IoIosArrowForward className='font-light ' />
</div>


</div> */}
</div>
  )
}

export default Compeight