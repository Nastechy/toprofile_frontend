import Teams from "@/components/dashboardcomp/teams/teams";
import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayouts/Adminlayouts";
import Service from "@/components/dashboardcomp/service/service";

const Page = () => {
  return (
    <AdminLayout>
      <p className="text-xl xl:text-2xl font-bold">Service</p>
      <div className=" py-4">
        <Service />
      </div>
    </AdminLayout>
  );
};

export default Page;
