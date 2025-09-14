"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import imone from "../../../../public/img/imone.jpg";
import nn from "../../../../public/img/nn.jpg";
import blc from "../../../../public/img/blc.jpg";
import cc from "../../../../public/img/cc.jpg";
import ww from "../../../../public/img/ww.jpg";
import gg from "../../../../public/img/gg.jpg";
import sen from "../../../../public/img/sen.png";
import { FaFacebookF, FaGooglePlusG, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";

const Teamcomp = () => {
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

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTeam = async () => {
    try {
      const response = await fetch(
        "http://backend.toprofile.com/api/v1/our_team/",
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
      setTeam(data.data); // Assuming the response is in the expected format
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const details = [
    {
      id: 1,
      pic: imone,
      label: "Chijindu Amanda Uwala",
      position: "Personnel Manager",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
    {
      id: 2,
      pic: nn,
      label: "Chukwuemeka Elijah Udeh",
      position: "Operations Manager",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
    {
      id: 3,
      pic: ww,
      label: "Abraham Nwankwo",
      position: "Architect",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
    {
      id: 4,
      pic: gg,
      label: "Abraham Azi",
      position: "Business Development Manager",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
    {
      id: 5,
      pic: blc,
      label: "Mercy Halidu Dalatu",
      position: "Asst. Business Development Manager",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
    {
      id: 6,
      pic: cc,
      label: "Ikenna Israel Samuel",
      position: "Procurement Manager",
      social: [
        {
          icon: (
            <a
              href="https://instagram.com/theragist?igshid=NzZlODBkYWE4Ng=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://www.linkedin.com/in/eniola-oni-8ba018180?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-black  h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
        {
          icon: (
            <a
              href="https://youtube.com/@theragist?si=OClCj1dGveog7Ci7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-black h-3 w-3 md:h-6 md:w-6 lg:h-4 lg:w-4 xl:h-5 xl:w-5" />
            </a>
          ),
        },
      ],
    },
  ];

  return (
    <div
      className="py-10 md:py-16 xl:py-28 bg-gray"
      data-aos="flip-right"
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
            Meet Our Team
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center pt-2 pb-5 md:pt-4 md:pb-14 lg:pt-5 lg:pb-10">
        <p className="text-center w-[85%] md:w-[90%] lg:w-[50%] xl:w-[50%] text-xs md:text-2xl lg:text-lg xl:text-xl font-light">
          Our team is dedicated to delivering excellence in every aspect of our
          work, ensuring your vision becomes a reality.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 md:gap-16  px-10 py-8 md:py-10 lg:py-3 xl:py-10 lg:px-20 xl:px-30">
        {team.map((datum) => (
          <div key={datum.id} className="flex flex-col gap-4 md:gap-8  ">
            <div className="flex flex-col gap-1 md:gap-2 shadow-2xl pb-5 md:pb-16 lg:pb-10 rounded-2xl">
              <div className="h-[50vh] md:h-[70vh] lg:h-[50vh]">
                <Image
                  src={datum.image}
                  width={"600"}
                  height={"300"}
                  alt="pic-img"
                  className="w-[100%] h-[100%] "
                />
              </div>
              <p className="text-sm md:text-2xl lg:text-sm xl:text-base font-medium px-5 pt-2 md:pt-4 lg:pt-2 ">
                {`${datum.first_name} ${datum.last_name}`}
              </p>
              <p className=" text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light text-orange px-5 ">
                {datum.postion}
              </p>
            </div>

            {/* <div className='flex flex-row justify-center items-center gap-4 '>
                                {datum?.social?.map((item) => (
                                    <div key={item.id} className='bg-white shadow-xl flex items-center justify-center rounded-full h-6 w-6 md:h-12 md:w-12 lg:h-8 lg:w-8 xl:h-10 xl:w-10'>
                                        <p key={item.id} className='flex flex-row'>{item.icon}</p>
                                    </div>
                                ))}
                            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teamcomp;
