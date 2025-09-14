import Property from '@/components/dashboardcomp/property/property'
import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts'



const Page = () => {
  return (
    <AdminLayout>
      <p className='text-xl xl:text-2xl font-bold'>Property</p>
      <div className=' py-4'>
        <Property />
      </div>
    </AdminLayout>
  )
}

export default Page