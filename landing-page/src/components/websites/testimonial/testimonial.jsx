import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./test.module.css";

import Man from "../../../../public/img/ma.png";
import woman from "../../../../public/img/woman.jpeg";
import sam from "../../../../public/img/sam.jpeg";
import jude from "../../../../public/img/jude.jpeg";

const Testimonial = () => {
  const details = [
    {
      id: 1,
      text: "Toprofile Real Estate Limited is my go-to place for all things REAL ESTATE. With them, you are sure that you are making an investment in the right property. And their talented team cannot disappoint your expectations. You will get your documents and allocation on time.",
      user: "Mr. Samson",
      frame: sam,
    },
    {
      id: 2,
      text: "Toprofile REL offers a fantastic experience and 'realty for royalty' indeed. Their website is user-friendly and their real estate service is topnotch. I highly recommend Toprofile Real Estate Limited.",
      user: "Ms. Victoria",
      frame: woman,
    },
    {
      id: 3,
      text: "As a first-time investor, I was nervous and pessimistic about the decision, but Toprofile REL made it seamless and stress-free. Their team was incredibly patient, answered all my questions, and found me the perfect property within my budget. I couldn't be happier!",
      user: "Dr. Jude",
      frame: jude,
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState([]);
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/testimony/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data", data);
      setTestimonials(data.data); // Assuming the response is in the expected format
    } catch (error) {
      setError(error.message);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "20px",
            height: "5px",
            backgroundColor: "#EB6C1F",
            borderRadius: "20%",
            margin: "0 10px",
          }}
        />
      );
    },
  };

  return (
    <div className="pt-10 md:pt-20 xl:pt-16 bg-gray">
      <div className="flex justify-center items-center gap-2">
        <div className="border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl">
          {" "}
        </div>
        <div className="border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl">
          {" "}
        </div>
        <div>
          <p className="text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl">
            TESTIMONIAL
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center pt-2 pb-5 md:pt-4 md:pb-14 lg:pt-5 lg:pb-10">
        <p className="text-center w-[85%] md:w-[90%] lg:w-[70%] xl:w-[50%] text-xs md:text-2xl lg:text-lg xl:text-xl font-light">
          What Our Customers Are saying
        </p>
      </div>
      <div className="px-10 pt-5 pb-10 md:px-20 md:py-0 md:pb-16">
        <Slider {...settings}>
          {testimonials.map((datum) => (
            <div key={datum.id} className="pb-5 md:pb-10 lg:px-6 lg:py-8">
              <div className="relative flex flex-col items-center">
                <div className="bg-white rounded-2xl p-5 md:p-10 flex flex-col gap-4 md:gap-6 lg:gap-6">
                  <div className="flex justify-center items-center">
                    <FaQuoteLeft className="h-4 w-4 md:h-8 md:w-8 text-lite" />
                  </div>
                  <div className={`${styles.textContainer} flex items-center`}>
                    <p className="text-xs font-light leading-5 md:text-2xl md:leading-9 lg:text-sm lg:leading-6 xl:text-base xl:leading-7 text-center">
                      {datum.comment}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-[-20px] md:bottom-[-35px] lg:bottom-[-25px] xl:bottom-[-20px] flex justify-center">
                  <div className="">
                    <Image
                      src={datum.image}
                      height={500}
                      width={400}
                      alt="pic-img"
                      className="h-[40px] w-[40px] md:h-[70px] md:w-[70px] lg:h-[50px] lg:w-[50px] rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-8 md:pt-16 lg:pt-10">
                <p className="text-xs leading-5 md:text-2xl md:leading-9 lg:text-sm lg:leading-6 xl:text-base xl:leading-7 text-center font-medium">
                  {datum.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
