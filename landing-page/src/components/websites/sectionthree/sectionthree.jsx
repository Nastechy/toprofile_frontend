"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import multi from "../../../../public/img/multi.png";
import white from "../../../../public/img/white.png";
import one from "../../../../public/img/one.png";
import four from "../../../../public/img/four.png";
import seven from "../../../../public/img/seven.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Sectionthree = () => {
  const [expanded, setExpanded] = useState(false);

  const shortenText = (text) => {
    const maxLength = 170;
    if (text.length > maxLength && !expanded) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    AOS.init();
    const options = {
      threshold: 0.2,
    };
    const observer = new IntersectionObserver(handleScroll, options);
    observer.observe(scrollTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScroll = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        AOS.refresh();
      }
    });
  };

  const details = [
    {
      id: 1,
      pic: multi,
      text: "Estate Development",
      textwo:
        "We are involved in land acquisition, planning, design, construction, and marketing. We maximize the value and utility of large pieces of land by creating functional and attractive improvements that meet the needs of the community or target market.",
    },
    {
      id: 2,
      pic: white,
      text: "Estate Management",
      textwo:
        "We oversee and handle various aspects of our clients' assets, properties, and investments, during their lifetime and even thereafter. We ensure the smooth transfer of assets to beneficiaries or heirs according to the individual's wishes or legal requirements.",
    },
    {
      id: 3,
      pic: one,
      text: "Sale and Marketing",
      textwo:
        "Let's walk you through the legal transfer of ownership of a piece of real estate (land, buildings, or others structures). Whether you are buying or selling, we will provide the solution you need",
    },
    {
      id: 4,
      pic: four,
      text: "Architecture",
      textwo:
        "We help investors and land users with aesthetically pleasing designs and the construction of their living spaces or other physical structures, in line with recommended prototypes and based on their needs.",
    },
    {
      id: 5,
      pic: seven,
      text: "Project Management",
      textwo:
        "With strong leadership and problem-solving skills, we plan, coordinate, oversee, and execute projects from conception to completion, on time and within scope.",
    },
  ];

  const [service, setService] = useState([]);
  const [error, setError] = useState([]);
  const fetchService = async () => {
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/our_service/`,
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
      setService(data.data); // Assuming the response is in the expected format
    } catch (error) {
      setError(error.message);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);
  return (
    <div
      className="bg-gray "
      data-aos="flip-down"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      ref={scrollTriggerRef}
    >
      <div className="flex justify-center items-center gap-2">
        <div className="border border-orange border-b-4 md:border-b-8 w-[10%] md:w-[6%] rounded-3xl">
          {" "}
        </div>
        <div className="border border-fad border-b-4 md:border-b-8 w-[6%] md:w-[3%] rounded-3xl">
          {" "}
        </div>
        <div>
          <p className="text-center text-xl md:text-4xl lg:text-2xl xl:text-3xl">
            Services
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center py-2  md:py-4 lg:py-5">
        <p className="text-center w-[85%] md:w-[90%] lg:w-[60%] xl:w-[50%] text-xs md:text-2xl lg:text-lg xl:text-xl font-light">
          {" "}
          With a focus on excellence and a commitment to innovation, we are here
          to bring your vision to life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 py-5 lg:px-20 xl:px-30">
        {service.map((datum) => (
          <div key={datum.id} className=" shadow-2xl flex flex-col gap-4">
            <Image
              src={datum.image}
              width="500"
              height="500"
              alt="pic-img"
              className="rounded-xl"
            />
            <p className="text-orange px-5 text-sm md:text-2xl lg:text-lg xl:text-xl font-medium ">
              {datum.title}
            </p>

            <p className="pb-5 px-5 text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light">
              {shortenText(datum.content)}
              {datum.content.length > 150 && (
                <span
                  className="text-orange text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light cursor-pointer"
                  onClick={toggleExpand}
                >
                  {expanded ? " Read Less" : " Read More"}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectionthree;
