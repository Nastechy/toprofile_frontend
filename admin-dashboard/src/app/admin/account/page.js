import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts';
import Account from '../../../components/dashboardcomp/account/page';

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Account</p>
      <div className=" py-4">
        <Account />
      </div>
    </AdminLayout>
  );
};

export default Page;
