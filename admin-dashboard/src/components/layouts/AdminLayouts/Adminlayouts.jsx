"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './adminlayout.module.css';
import Sidebar from '../../dashboardcomp/sidebar/sidebar';
import Head from "next/head";
import Image from 'next/image'
import logone from '../../../../public/img/to.png'
import Link from 'next/link'
import { TbWorld } from 'react-icons/tb'
import { IoIosMenu } from "react-icons/io";
import Dropdown from '../../dashboardcomp/Dropdown/dropdown';




const AdminLayout = ({ children }) => {

    const [isNewComp, setIsNewComp] = useState(false);
    const router = useRouter();
    const user = false;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const title = "Toprofile_Admin Dashboard";

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleNewCompClick = () => {
        setIsNewComp(prevState => !prevState);
    };
    const handleNotificationsClick = () => {
        setShowModal(prevState => !prevState); // Toggle modal visibility
    };
    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };


    const toggleMenu = () => {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
    };

    const toggleSidebar = () => {
        setIsMenuOpen(false); // Close sidebar links
    };


    const isDashboardPage = router && router.pathname && router.pathname.includes("/dashboard");

    return (
        <div className=''>
            <div className='flex justify-center items-center h-[100vh] overflow-hidden lg:hidden'>
                <div>
                    <p className='text-center text-sm md:text-3xl md:leading-10'>Not available on mobile device</p>
                    <p className='text-center text-sm md:text-3xl md:leading-10'>View on a desktop/laptop</p>
                </div>
            </div>

            <div className={`${styles.maincont} ${isMenuOpen ? styles.menuOpen : ''}`}>
                <Head>
                    <title>{title}</title>
                </Head>

                <div className={`${styles.subcont} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    <div
                        className={`${styles.subcontone} ${isMenuOpen ? styles.menuOpen : ''}`}
                    >
                        <Sidebar closeMenu={closeMenu} toggleSidebar={toggleSidebar} />
                    </div>

                    <div className={`${styles.subcontwo} ${isMenuOpen ? styles.menuClosed : ''}`}>
                        <div className='flex items-center justify-between px-5 py-3 xl:px-5 xl:py-2 bg-white shadow-2xl'>
                            <div className={styles.menu} >
                                <button >
                                    <IoIosMenu onClick={toggleMenu} className='text-black h-4 w-4 xl:h-6 xl:w-6 ' />
                                    {/* <p className='text-xs  md:text-xl lg:text-base xl:text-lg'>{activeLink}</p> */}
                                </button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Link href={`/`}>
                                    <div className='flex items-center gap-1'>
                                        <TbWorld className='text-lite h-4 w-4 xl:h-6 xl:w-6 ' />
                                        <p className='text-lite'>View Website</p>
                                    </div>
                                </Link>
                                <Dropdown />
                            </div>

                        </div>

                        <div className='p-5 xl:px-5 xl:py-8 '>
                            {children}
                        </div>
                    </div>
                </div>



            </div>

        </div>
    );
};

export default AdminLayout