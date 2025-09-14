import Compeight from '@/components/websites/compeight/compeight'
import React from 'react'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './blog.module.css'
import Header from '@/components/websites/header/header'
import Blogsnews from '@/components/websites/blogsnews/blogsnews'

const Page = () => {
  return (
    <div>
    <div className={styles.main}>
      <Header />
      <Compeight/>
    </div>
<Blogsnews />

  </div>
  )
}

export default Page