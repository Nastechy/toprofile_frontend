"use client"

import React from 'react'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Successblog from '../../../components/websites/blogsnews/[category]/page'

const Page = () => {
  const {singleblogid} = useParams();

  

  if (!singleblogid) {
    // Handle loading or error state
    return null;
 
  }
  console.log(singleblogid)
  return (
    <div>

      <Successblog  id={singleblogid} />
    </div>
  );
};

export default Page;
