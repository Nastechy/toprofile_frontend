import Blogs from '@/components/dashboardcomp/blogs/blogs';
import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts';

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Blog</p>
      <div className=" py-4">
        <Blogs />
      </div>
    </AdminLayout>
  );
};

export default Page;
