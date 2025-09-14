"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useParams } from "next/navigation";
import five from "../../../../../public/img/five.png"; // Default fallback image
import two from "../../../../../public/img/two.png";
import three from "../../../../../public/img/three.png";
import map from "../../../../../public/img/map.png";
import four from "../../../../../public/img/six.png";
import { FaLandmark } from "react-icons/fa";
import Navbar from "../../navbar/navbar";
import Link from "next/link";

const Page = () => {
  const { singlepropertyid } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFetchProperty = async (slug) => {
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/property/${slug}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the Property");
      }

      const data = await response.json();
      setProperties(data.data);
      console.log("Property fetched:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singlepropertyid) {
      handleFetchProperty(singlepropertyid);
    }
  }, [singlepropertyid]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle any errors
  }

  // Prepare images to display
  const imagesToShow = properties.propertyImages || [];
  const filledImages = [...imagesToShow];

  // Fill empty slots with the first image if there are less than 5
  const firstImage = filledImages[0]?.image || five; // Fallback to default image if no images
  while (filledImages.length < 5) {
    filledImages.push({ image: firstImage }); // Push the first image until there are 5
  }

  return (
    <div className="bg-gray">
      <Navbar />

      <div className="px-10 md:px-16 lg:px-20 xl:px-30 flex flex-col gap-8 md:gap-14 ">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="flex-1 ">
            <Image
              src={filledImages[0]?.image || five}
              alt="pic-img"
              className="h-[100%]"
              width={"700"}
              height={"700"}
            />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 md:gap-8">
            {filledImages.slice(1, 5).map((img, index) => (
              <Image
                key={index}
                src={img.image || five}
                alt={`pic-img-${index}`}
                width={"700"}
                height={"700"}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
          <div className="flex-1">
            <div className="px-0 md:px-2 lg:px-0">
              <p className="text-xs md:text-xl lg:text-base xl:text-base font-medium ">
                {properties.title || "Property Title"}
              </p>
            </div>

            <div className="px-0 md:px-2 lg:px-0 pt-2 md:pt-3">
              <div className="flex items-center justify-start gap-4 md:gap-8 lg:gap-8">
                <div className="flex items-center gap-1 md:gap-1 lg:gap-2">
                  <FaLandmark className="text-orange h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
                  <p className="text-xs md:text-lg lg:text-sm xl:text-base leading-5 font-light">
                    {properties.land_space || "Land space"} sq+
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-2 lg:px-0 pt-2 md:pt-5 flex flex-col gap-1 md:gap-2 ">
              <p className="text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light">
                {properties.body || "Property description..."}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div className="pb-2 md:pb-5 px-0 md:px-2 lg:px-3 flex flex-col gap-1 md:gap-2 ">
              <p className="text-slate-400 text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light">
                Price
              </p>
              <p className="text-lite text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light">
                {`₦${properties.amount || "0.00"}`}
              </p>
            </div>
            <div className="px-0 md:px-2 lg:px-3 flex items-center gap-6">
              <Link href="https://wa.me/message/R3XZ3HBLHXWMG1">
                <button className="bg-orange text-white px-4 py-2 text-xs md:text-xl lg:text-sm xl:text-base">
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 py-10 md:py-16 lg:pb-20 md:px-16 lg:px-20 xl:px-30">
        <Image src={map} alt="map-img" className="" />
      </div>
    </div>
  );
};

export default Page;
