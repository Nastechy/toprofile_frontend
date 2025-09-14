import Image from 'next/image'
import React from 'react'
import tw from '../../../../public/img/tw.png'
import fr from '../../../../public/img/fr.png'
import cc from '../../../../public/img/cc.jpeg'
import one from '../../../../public/img/one.jpeg'
import two from '../../../../public/img/two.jpeg'
import flag from '../../../../public/img/flag.jpeg'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";



const Compabout = () => {
    const details = [
        {
            id: 1,
            pic: cc,
            label: "VISION STATEMENT",
            text: "To be a globally recognized real estate company, where all stakeholders are royalty.",
        },
        {
            id: 2,
            pic: flag,
            label: "MISSION STATEMENT",
            text: "To foster genuine property acquisition, robust land banking, and sustainable estate development, working with a dynamic team of professionals to deliver quality home ownership through expert knowledge and innovation.",
        }
    ]

    const value = [
        {
            id: 1,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Hard work",
        },
        {
            id: 2,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Teamwork",
        },
        {
            id: 3,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Accountability",
        },
        {
            id: 4,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Honesty",
        },
        {
            id: 5,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Excellence",
        },
        {
            id: 6,
            icon: <IoIosCheckmarkCircleOutline className='text-orange w-6 h-6 md:h-10 md:w-10' />,
            textwo: "Leadership",
        },

    ]
    return (
        <div className='px-10 py-5 md:py-10 md:px-16 lg:px-20 xl:px-30'>

            <div className='flex flex-col lg:flex-row gap-4 md:gap-8 xl:gap-4'>
                <div className='flex-1 flex flex-col gap-2 md:gap-4'>
                    <p className='text-lite text-lg md:text-4xl lg:text-2xl xl:text-3xl font-semibold'>Toprofile Real Estate Limited </p>
                    <p className='text-xs leading-6 md:text-2xl md:leading-10 lg:text-base lg:leading-8 xl:text-lg xl:leading-10 font-light xl:w-[90%]'>Toprofile Real Estate Limited (RC: 6900425) is passionate about helping to empower families by providing them safe and prosperous communities to live or do businesses in. Our employees are characterized by excellence, respect, integrity, and the ability to consistently deliver superior professional service laced with innovation.
                        Every step of the way in our conversations, we keep the satisfaction of our clientele in the vanguard. We provide every necessary support to our clients, leaving them pleased and proud to recommend us to their families, friends, well-wishers, and colleagues. Above all, our investors are assured of our uncompromising accountability, to the end that, through us, they realize their ultimate happiness and value for their money.</p>
                </div>

                <div className='flex-1 flex flex-col gap-10 md:gap-16 lg:gap-10 lg:flex-col-reverse'>
                    <div className='w-full flex-1 lg:relative'>
                        <Image src={one} alt='tw-img' className='h-[40vh] lg:absolute top-0 left-0 w-full lg:h-full object-cover rounded-2xl' />
                    </div>
                    <div className='w-full  flex-1 relative'>
                        <Image src={two} alt='tw-img' className='h-[40vh] lg:absolute top-0 left-0 w-full lg:h-full object-cover rounded-2xl' />
                    </div>
                </div>



            </div>

            <div className=' py-10 md:py-20 gap-8 md:gap-12 flex flex-col lg:flex-row justify-between '>
                {
                    details.map((datum) => (
                        <div key={datum.id} className='flex-1 flex flex-col gap-1 md:gap-4 lg:gap-4 xl:gap-6'>
                            <Image src={datum.pic} alt='pic-img' className='w-[10%] md:w-[8%] lg:w-[10%] xl:w-[7%] h-auto' />
                            <p className='text-lite text-base md:text-3xl lg:text-xl xl:text-2xl font-300'>{datum.label}</p>
                            <p className='text-xs md:text-2xl lg:text-base font-light xl:w-[90%] '>{datum.text}</p>
                        </div>
                    ))
                }
            </div>

            <div >
                <p className='text-center text-lite text-base md:text-3xl lg:text-xl xl:text-2xl font-300 '>CORE VALUES</p>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10 py-5 md:py-10'>
                    {
                        value.map((items) => (
                            <div key={items.id} className='bg-gray px-5 py-8 md:p-16 lg:p-10 rounded-2xl flex flex-col items-center justify-center gap-4'>
                                <p>{items.icon}</p>
                                <p className='text-xs md:text-2xl lg:text-base font-light'>{items.textwo}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='py-5 xl:py-10'>
                <p className='text-center text-lite text-base md:text-3xl lg:text-xl xl:text-2xl font-300 '>UNIQUE SELLING PROPOSITION</p>
                <div className='flex justify-center items-center'>
                    <p className='text-center  text-xs md:text-xl lg:text-sm xl:text-base pt-3 md:pt-5 font-light lg:w-[80%] xl:w-[60%]'>Our top-shelf services satisfy the aspirations of our investors, who then perpetuate our vision through referral marketing.</p>
                </div>
            </div>
        </div>
    )
}

export default Compabout