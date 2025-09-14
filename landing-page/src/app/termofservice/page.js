import Compsix from '@/components/websites/compsix/compsix'
import React from 'react'
import Sectionone from '../../components/websites/sectionone/index'
import styles from './term.module.css'
import Header from '@/components/websites/header/header'
import Terms from '@/components/websites/terms/terms'

const Page = () => {
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <Compsix />
      </div>
  <Terms />

    </div>
  )
}

export default Page