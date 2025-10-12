'use client';
import React from 'react';
import Link from 'next/link';
import styles from './dashboardheader.module.css';
import { TbWorld } from 'react-icons/tb';

import Dropdown from '../Dropdown/dropdown';

const DashboardHeader = () => {
  return (
    <div className={styles.main}>
      <p>Counselor Registration</p>

      <div className={styles.contwo}></div>
      <div className={styles.conthree}>
        <Link href={`/`}>
          <div className={styles.divone}>
            <TbWorld color="orange" className={styles.icon} />
            <p className="text-red-300">View Website</p>
          </div>
        </Link>
        <div className={styles.divone}>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
