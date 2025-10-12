import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts';

import About from '@/components/dashboardcomp/about/about';

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Account</p>
      <div className=" py-4">
        <About />
      </div>
    </AdminLayout>
  );
};

export default Page;
