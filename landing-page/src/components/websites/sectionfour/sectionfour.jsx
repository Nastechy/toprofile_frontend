// pages/properties/index.js
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaLandmark } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch all properties initially using fetch
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `http://backend.toprofile.com/api/v1/property/`
        );
        const data = await response.json();
        setProperties(data.data); // Assuming response structure has data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray pt-10 md:pt-16 xl:pt-28">
      <div className="flex justify-center items-center gap-2">
        <div className="border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl">
          {" "}
        </div>
        <div className="border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl">
          {" "}
        </div>
        <div>
          <p className="text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl">
            Featured Properties
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pt-2 pb-5 md:pt-4 md:pb-14 lg:pt-5 lg:pb-10">
        <p className="text-center w-[85%] md:w-[90%] lg:w-[50%] xl:w-[50%] text-xs md:text-2xl lg:text-lg xl:text-xl font-light">
          A platform to acquire your desired properties. We offer the
          best-selling locations.
        </p>
      </div>

      <div className="px-10 pt-5 pb-10 md:pt-5 md:pb-10 lg:pb-10 lg:px-20 xl:px-30 bg-transparent">
        <Slider {...settings}>
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col gap-2 md:gap-4 px-2 py-4 md:py-6 lg:px-2 lg:py-8 xl:px-6 hover:shadow-2xl hover:shadow-slate-400"
            >
              {/* <div>{JSON.stringify(property, null, 2)}</div> */}
              <div className="bg-white pb-3 md:pb-6 lg:pb-4 rounded-t-xl">
                <div className="h-48 w-full">
                  <Image
                    src={property.propertyImages[0].image} // Assuming propertyImages is an array
                    alt="property-img"
                    className="rounded-xl"
                    style={{ width: "100%", height: "100%" }}
                    width={"500"}
                    height={"500"}
                  />
                </div>

                <div className="px-5 pt-4 md:px-2 lg:px-5 flex flex-col justify-between items-stretch">
                  <p className="text-xs md:text-lg lg:text-sm font-medium flex-grow">
                    {property.category.name}
                  </p>
                  <div className="border-gray border-b-[1px] mt-2 md:mt-2 lg:mt-1"></div>
                </div>

                <div className="px-5 pt-2 md:px-2 lg:px-5">
                  <div className="flex items-stretch">
                    <p className=" text-xs md:text-lg lg:text-sm leading-5 font-light flex-grow">
                      {property.title}
                    </p>
                  </div>
                  <div className="border-gray border-b-[1px] mt-2 md:mt-5 lg:mt-2"></div>
                </div>

                <div className="px-5 py-2 md:py-4 md:px-2 lg:px-5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 md:gap-1 lg:gap-2">
                      <FaLandmark className="text-orange h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
                      <p className="text-xs md:text-lg lg:text-sm leading-5 font-light">
                        {property.land_space} SQM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 md:px-2 lg:px-5">
                  <div className="border-gray border-b-[1px]"></div>
                  <div className="py-3 md:py-6 lg:py-4 flex items-center">
                    <Link
                      href={`/properties/${property.category.name}`}
                      // href={`/properties`}
                      // href={`/properties/${property.label}`}
                    >
                      <button className="flex justify-center items-center gap-4 border bg-orange text-white text-xs md:text-lg lg:text-sm px-6 py-2 md:py-2 lg:py-2">
                        VIEW MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Properties;
