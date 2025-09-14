"use client"

import React from 'react'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SuccessProperty from '../../../components/websites/projectcomp/[category]/page'

const Page = () => {
  const {singlepropertyid} = useParams();

  

  if (!singlepropertyid) {
    // Handle loading or error state
    return null;
 
  }
  console.log(singlepropertyid)
  return (
    <div>

      <SuccessProperty id={singlepropertyid} />
    </div>
  );
};

export default Page;
