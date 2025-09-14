import Settings from '@/components/dashboardcomp/settings/settings'
import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts'



const Page = () => {
  return (
    <AdminLayout>
      <p className='text-xl xl:text-2xl font-bold'>Settings</p>
      <div className=' py-4'>
        <Settings />
      </div>
    </AdminLayout>
  )
}

export default Page