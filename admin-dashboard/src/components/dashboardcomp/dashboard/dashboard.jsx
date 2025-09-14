"use client";

import { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";
import { PiUsersThreeThin } from "react-icons/pi";
import red from "../../../../public/img/red.jpeg";
import green from "../../../../public/img/green.jpeg";
import blue from "../../../../public/img/blue.jpeg";
import house from "../../../../public/img/house.jpeg";
import Image from "next/image";
import { IoMdEye } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import kam from "../../../../public/img/nine.png";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import BarChart from "./barchart/barchart";
import client from "@/components/utils/client";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: true,
    isError: false,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setFetchStatus((prev) => ({ ...prev, isLoading: true }));
        const response = await client("/dashboard/");
        setDashboardData(response.data.data);
        setFetchStatus({ isLoading: false, isError: false, error: null });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setFetchStatus({ isLoading: false, isError: true, error });
      }
    };

    fetchDashboardData();
  }, []);
  const details = [
    {
      id: 1,
      pic: red,
      icon: <TbUsers className="h-6 w-6 xl:w-6 xl:h-6 text-lite" />,
      text: dashboardData?.visitor || 0,
      textwo: "Visitor",
    },
    {
      id: 2,
      pic: blue,
      icon: <PiUsersThreeThin className="h-6 w-6 xl:w-6 xl:h-6 text-lite" />,
      text: dashboardData?.blogPost || 0,
      textwo: "Blog Post",
    },
    {
      id: 3,
      pic: green,
      icon: <PiUsersThreeThin className="h-6 w-6 xl:w-6 xl:h-6 text-lite" />,
      text: dashboardData?.agent || 0,
      textwo: "Agents",
    },
    {
      id: 4,
      pic: house,
      icon: <PiUsersThreeThin className="h-6 w-6 xl:w-6 xl:h-6 text-lite" />,
      text: dashboardData?.property || 0,
      textwo: "Properties",
    },
  ];

  const cat = dashboardData?.article || [];

  console.log(cat, "fuck you");

  const calculateDeviceUsage = () => {
    const webUsers = 80; // Example data, replace with real data if available
    const mobileUsers = 20;

    return {
      labels: ["Web", "Mobile"],
      datasets: [
        {
          data: [webUsers, mobileUsers],
          backgroundColor: ["#EB6C1F", "#FFEBF0"],
          borderWidth: 0,
        },
      ],
    };
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed) {
              label += new Intl.NumberFormat().format(context.parsed);
            }
            return label;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: "70%",
  };

  function truncateTitle(title, maxLength) {
    return title && title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  }

  function truncateComment(comment, maxLength) {
    return comment && comment.length > maxLength
      ? `${comment.substring(0, maxLength)}...`
      : comment;
  }

  return ( fetchStatus.isLoading ? <h1>Loading...</h1>:
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-4 gap-6">
        {details?.map((datum) => (
          <div
            key={datum.id}
            className="bg-white rounded-2xl p-5 flex flex-col justify-center items-center gap-4"
          >
            <Image
              src={datum.pic}
              alt="pic-img"
              className="w-[25%] xl:w-[20%]"
              width={"20"}
              height={"20"}
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-lite text-2xl font-semibold">{datum.text}</p>
              <p className="text-sm font-light">{datum.textwo}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-10">
        <div className="flex items-center gap-10">
          <p className="text-xs">Visitors Summary</p>
          <p className="text-xs">Jan 2023 - Dec 2023</p>
        </div>
        <BarChart />
      </div>
      <div className="flex gap-6">
        <div className="flex-2 bg-white p-10 rounded-2xl">
          <table className="table-auto w-full text-sm">
            <thead className="h-[7vh]">
              <tr>
                <th className="w-[40%]">
                  <div className="flex items-center gap-2 justify-start">
                    <p className="text-center text-sm font-medium">
                      Popular Article
                    </p>
                  </div>
                </th>
                <th className="w-[20%]">
                  <p className="text-center text-sm font-medium">Post Date</p>
                </th>
                <th className="w-[20%]">
                  <p className="text-center text-sm font-medium">Views</p>
                </th>
                <th className="w-[20%]">
                  <p className="text-center text-sm font-medium">Comment</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {cat?.map((datum) => (
                <tr
                  key={datum.id}
                  className="h-[6vh] border-b border-slate-300 text-black"
                >
                  <td className="w-[40%] ">
                    <div className="flex items-center justify-start gap-4">
                      {/* <Image
                        src={datum.image}
                        alt="pic-img"
                        className="w-[20%] xl:w-[20%]"
                        width={"20"}
                        height={"20"}
                      /> */}
                      <div>
                        <p className="text-xs xl:text-sm text-black">
                          {truncateTitle(datum.title, 15)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-[20%]">
                    <div className="text-center">
                      <p className="text-xs xl:text-sm">{datum.date}</p>
                    </div>
                  </td>
                  <td className="text-center w-[20%] ">
                    <div className="flex justify-center items-center gap-2">
                      <IoMdEye className="h-4 w-4" />
                      <p className="text-xs xl:text-sm">{datum.view}</p>
                    </div>
                  </td>
                  <td className="text-center w-[20%]">
                    <p className="text-xs xl:text-sm ">
                      {truncateComment(datum.comment, 5)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 bg-white p-5 xl:p-10 rounded-2xl">
          <p className="text-sm text-center font-semibold">USED DEVICE</p>
          <div className="flex justify-center items-center">
            <div className="w-[80%] xl:w-[70%] pt-5">
              <Pie
                data={calculateDeviceUsage()}
                options={pieOptions}
                className="w-[100%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
