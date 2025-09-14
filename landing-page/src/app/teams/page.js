
import React from 'react'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './team.module.css'
import Header from '@/components/websites/header/header'
import Compteam from '@/components/websites/compteam/compteam'
import Teamcomp from '@/components/websites/teamcomp/teamcomp'

const Page = () => {
  return (
    <div>
    <div className={styles.main}>
      <Header />
      <Compteam/>
    </div>
<Teamcomp />

  </div>
  )
}

export default Page