import React, { useState } from 'react';

const AdminAppearance = () => {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

    const handleToggle = () => {
        setIsMaintenanceMode(prevState => !prevState);
    };

    return (
        <div className='border border-slate-300 rounded-2xl p-5 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <p className='text-sm'>Admin Logo</p>
                <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: "block" }}
                        className='text-xs'
                        onChange={(e) => console.log(e.target.files[0])} // handle file selection
                    />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-sm'>Admin Favicon</p>
                <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: "block" }}
                        className='text-xs'
                        onChange={(e) => console.log(e.target.files[0])} // handle file selection
                    />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-sm'>Login Screen Backgrounds</p>
                <div className='flex items-center border border-slate-300 p-2 rounded-2xl gap-2'>
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: "block" }}
                        className='text-xs'
                        onChange={(e) => console.log(e.target.files[0])} // handle file selection
                    />
                </div>
            </div>

            <div className='flex gap-2 items-center pt-16'>
                <p className='text-sm'>Switch to Maintenance Mode:</p>
                <div
                    className={`relative flex items-center w-8 h-4 bg-slate-300 p-1 rounded-full cursor-pointer ${isMaintenanceMode ? 'bg-slate-400' : ''}`}
                    onClick={handleToggle}
                >
                    <input
                        type='checkbox'
                        checked={isMaintenanceMode}
                        onChange={handleToggle}
                        className='hidden' // Hide the default checkbox
                    />
                    <div
                        className={`absolute left-0 w-4 h-4 ${isMaintenanceMode ? 'bg-slate-500' : 'bg-slate-500'} rounded-full shadow-md transition-transform`}
                        style={{ transform: isMaintenanceMode ? 'translateX(14px)' : 'translateX(0)' }}
                    ></div>
                </div>
            </div>

            <div className='flex justify-end items-center pt-16'>
                <button className='text-sm bg-lite text-white px-8 py-2'>Save</button>
            </div>
        </div>
    )
}

export default AdminAppearance;
