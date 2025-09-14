import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./cat.module.css";
import { useParams } from "next/navigation";
import Header from "../../header/header";
import Compeight from "../../compeight/compeight";
import multi from "../../../../../public/img/six.png";
import { BsClock } from "react-icons/bs";
import Link from "next/link";

const Page = () => {
  const { singleblogid } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const details = [
    {
      id: 1,
      pic: multi,
      duration: "4 mins read",
      text: "Real Estate, The Next Level Power House",
      textwo: "Read More...",
    },
    {
      id: 2,
      pic: multi,
      duration: "4 mins read",
      text: "Real Estate, The Next Level Power House",
      textwo: "Read More...",
    },
    {
      id: 3,
      pic: multi,
      duration: "4 mins read",
      text: "Real Estate, The Next Level Power House",
      textwo: "Read More...",
    },
    {
      id: 4,
      pic: multi,
      duration: "4 mins read",
      text: "Real Estate, The Next Level Power House",
      textwo: "Read More...",
    },
  ];
  const handleFetchBlog = async (slug) => {
    try {
      const response = await fetch(
        `http://backend.toprofile.com/api/v1/blog/${slug}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the blog");
      }

      const data = await response.json();
      setBlog(data.data);
      console.log("Blog fetched:", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleblogid) {
      handleFetchBlog(singleblogid);
    }
  }, [singleblogid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found.</div>;

  return (
    <div>
      <div className={styles.main}>
        <Header />
        <Compeight />
      </div>

      <div className="px-10 py-10 lg:py-16 md:px-16 lg:px-20 xl:px-30 flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-20">
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          <div>
            <Image
              src={blog.image}
              alt="pic-img"
              className=""
              width={"600"}
              height={"200"}
            />
          </div>
          <div className="px-0 md:px-2 lg:px-0">
            <p className="text-sm md:text-2xl lg:text-lg xl:text-xl font-medium ">
              {blog.title}
            </p>
          </div>

          <div className="px-0 md:px-2 lg:px-0 flex flex-col gap-1 md:gap-2 ">
            <p className="text-xs md:text-xl lg:text-sm xl:text-base leading-5 font-light">
              {blog.body}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm md:text-2xl lg:text-lg xl:text-xl font-medium ">
            Recent Post
          </p>
          <div className="grid gap-4 md:gap-6 lg:gap-4 py-3 md:py-5">
            {details.map((datum) => (
              <div key={datum.id} className="shadow-2xl flex bg-white ">
                <div className="flex-1">
                  <Image
                    src={datum.pic}
                    alt="pic-img"
                    className="rounded-l-2xl h-[100%]"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2 py-5">
                  <div className="px-3 lg:px-5">
                    <div className="flex items-center justify-start gap-1 md:gap-2 lg:gap-2">
                      <BsClock className="text-brw h-3 w-3 md:h-5 md:w-5 lg:h-4 lg:w-4" />
                      <p className="text-xs md:text-lg lg:text-sm text-brw">
                        {datum.duration}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 lg:px-5">
                    <p className="text-xs md:text-xl lg:text-sm text-slate-600">
                      {datum.text}
                    </p>
                  </div>
                  <div className="px-3 lg:px-5">
                    <Link href={`/blog/${datum.id}`}>
                      <p className="text-xs md:text-lg lg:text-sm text-lite cursor-pointer">
                        Read More...
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
