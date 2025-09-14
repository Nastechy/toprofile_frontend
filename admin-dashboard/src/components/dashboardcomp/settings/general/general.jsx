import React from 'react'
import { CiEdit } from "react-icons/ci";

const General = () => {
  return (
    <div className='border border-slate-300 rounded-2xl p-5 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Admin Email</p>

      <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
        <CiEdit className='h-4 w-4 xl:w-5 xl:h-5' />
      <input type="text"
        placeholder='Enter'
        className='border-none outline-none text-sm ' />
      </div>
      </div>

      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Phone Number</p>

      <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
        <CiEdit className='h-4 w-4 xl:w-5 xl:h-5' />
      <input type="text"
        placeholder='Enter'
        className='border-none outline-none text-sm ' />
      </div>
      </div>

      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Address</p>

      <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
        <CiEdit className='h-4 w-4 xl:w-5 xl:h-5' />
      <input type="text"
        placeholder='Enter'
        className='border-none outline-none text-sm ' />
      </div>
      </div>

      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Email</p>

      <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
        <CiEdit className='h-4 w-4 xl:w-5 xl:h-5' />
      <input type="text"
        placeholder='Enter'
        className='border-none outline-none text-sm ' />
      </div>
      </div>

      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Site Language</p>

      <div>
        <select name="" id="" className=' border border-slate-300 p-2 rounded-2xl w-full outline-none text-sm'>
        <option value="" className='text-sm'>Select language</option>
        <option value="Eng" className='text-sm'>English</option>
        <option value="frn" className='text-sm'>French</option>
        <option value="kr" className='text-sm'>Korean</option>

        </select>
       
      </div>
      </div>

      <div className='flex flex-col gap-2'>  
        <p className='text-sm'>Time Zone</p>

        <div>
        <select name="" id="" className=' border border-slate-300 p-2 rounded-2xl w-full outline-none text-sm'>
        <option value="" className='text-sm'>Select Time Zone</option>
        <option value="Eng" className='text-sm'>Gmt</option>
        <option value="frn" className='text-sm'>Gmt</option>
        <option value="kr" className='text-sm'>Gmt</option>

        </select>
       
      </div>
      </div>

      <div className='flex justify-end items-center pt-16'>
        <button className='text-sm bg-lite text-white px-8 py-2'>Save</button>
      </div>



        </div>
  )
}

export default General