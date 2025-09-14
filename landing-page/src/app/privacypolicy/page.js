import Compseven from '@/components/websites/compseven/compseven'
import React from 'react'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './privacy.module.css'
import Header from '@/components/websites/header/header'
import Privacy from '@/components/websites/privacy/privacy'

const Page = () => {
  return (
    <div>
    <div className={styles.main}>
      <Header />
      <Compseven />
    </div>
<Privacy />

  </div>
  )
}

export default Page