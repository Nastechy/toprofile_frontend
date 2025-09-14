"use client"
import Image from "next/image";
import AdminLayout from "@/components/layouts/AdminLayouts/Adminlayouts";
import Dashboard from "@/components/dashboardcomp/dashboard/dashboard";
import { Pie } from 'react-chartjs-2';
import SignupComp from "@/components/Auth/signupComp/signupComp";

export default function Home() {
  return (
<div>
  <SignupComp />
</div>
  );
}
