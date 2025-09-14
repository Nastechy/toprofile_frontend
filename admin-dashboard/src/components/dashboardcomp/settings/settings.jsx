"use client"
import React, { useState } from 'react';
import Blogs from '../blogs/blogs';
import Property from '../property/property';
import Adminapperance from './adminapperance/adminapperance';
import Cache from './cache/cache';
import Datatable from './datatable/datatable';
import General from './general/general';
import Newsletter from './newsletter/newsletter';
import Speed from './speed/speed';
import Theme from './theme/theme';

const Settings = () => {
    const details = [
        {
            id:1,
            text:"General Information",
            textwo:"setting site information"
        },
        {
            id:2,
            text:"Admin appearance",
            textwo:"setting admin appearance such as editor language."
        },
        {
            id:3,
            text:"Cache",
            textwo:"Config cache for system for optimize speed"
        },
        {
            id:4,
            text:"Datatables",
            textwo:"setting for datatables"
        },
        {
            id:5,
            text:"Optimize page speed",
            textwo:"Minify HTML output, inline CSS, remove comments...."
        },
        {
            id:6,
            text:"Theme",
            textwo:"Setting for theme"
        },
        {
            id:7,
            text:"Newletters",
            textwo:"Settings for newsletter (auto send newsletter email to SendGrid, Mailchimp... when someone register newsletter on website)."
        },
    ]

    const [selectedDetail, setSelectedDetail] = useState(1);

    const handleDetailClick = (id) => {
        setSelectedDetail(id);
    };



  return (
    <div className='bg-white px-10 py-10'>
    <div className='flex  justify-between gap-8'>
        <div className='flex-1 flex flex-col gap-8  '>
            {details.map((datum) => (
                <div
                    key={datum.id}
                    className={`border border-slate-300 rounded-2xl p-5 flex flex-col gap-2 hover:bg-lite hover:text-white cursor-pointer ${
                        selectedDetail === datum.id ? 'bg-lite text-white' : ''
                    }`}
                    onClick={() => handleDetailClick(datum.id)}
                >
                    <p className='text-sm'>{datum.text}</p>
                    <p className='text-xs'>{datum.textwo}</p>
                </div>
            ))}
        </div>
        <div className='flex-2 '>
        {selectedDetail !== null && (
    <>
        {selectedDetail === 1 ? (
            <General />
        ) : selectedDetail === 2 ? (
            <Adminapperance />
        ) : selectedDetail === 3 ? (
            <Cache />
        ) : selectedDetail === 4 ? (
            <Datatable />
        ) : selectedDetail ===5 ? (
            <Speed />
        ) : selectedDetail ===6 ? (
            <Theme />
        ) : selectedDetail ===7 ? (
            <Newsletter />
        ) : selectedDetail ===8 (
            <div></div>
        )
        }
    </>
)}

        </div>
    </div>
</div>
  )
}

export default Settings