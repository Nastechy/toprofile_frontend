import Teams from '@/components/dashboardcomp/teams/teams';
import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayouts/Adminlayouts';

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Team</p>
      <div className=" py-4">
        <Teams />
      </div>
    </AdminLayout>
  );
};

export default Page;
