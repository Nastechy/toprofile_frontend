import Comproject from '@/components/websites/comproject/comproject'
import React from 'react'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './projects.module.css'
import Header from '@/components/websites/header/header'
import Projectcomp from '@/components/websites/projectcomp/projectcomp'

const Page = () => {
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <Comproject />
      </div>
      <Projectcomp />

    </div>
  )
}

export default Page