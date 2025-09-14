"use client"
import React from 'react'

import styles from './cat.module.css'
import { useParams } from 'next/navigation';


const Page = ({ id }) => {
  const {singlepropertyid} = useParams();

  // if (!details) {
  //   return <div>Loading...</div>; // Add a loading state while fetching data
  // }



  return (
    <div>
      <div className={styles.main}>
      <p>hello</p>
      </div>
        
    </div>
  )
}

export default Page

