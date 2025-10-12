import Testimonials from '@/components/dashboardcomp/testimonials/testimonials';
import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts';

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Testimonial</p>
      <div className=" py-4">
        <Testimonials />
      </div>
    </AdminLayout>
  );
};

export default Page;
