
import React from 'react'
import Compnine from '@/components/websites/compnine/compnine'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './about.module.css'
import Header from '@/components/websites/header/header'
import Compabout from '@/components/websites/compabout/compabout'

const Page = () => {
  return (
    <div>
    <div className={styles.main}>
      <Header />
      <Compnine/>
    </div>
<Compabout />

  </div>
  )
}

export default Page