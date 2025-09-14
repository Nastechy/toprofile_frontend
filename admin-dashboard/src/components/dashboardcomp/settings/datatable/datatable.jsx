import React from 'react'

const Datatable = () => {
    return (
        <div className='border border-slate-300 rounded-2xl p-5 flex flex-col gap-8'>
            <div>
                <p className='text-sm'>Default show column visibility?</p>
                <div className=' flex items-center gap-4 pt-3'>
                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="yes" name="column" value="yes" />
                        <label htmlFor="yes" className='text-sm'>Yes</label>
                    </div>

                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="no" name="column" value="no" />
                        <label htmlFor="no" className='text-sm'>No</label>
                    </div>
                </div>
            </div>

            <div>
                <p className='text-sm'>Default show export button?</p>
                <div className=' flex items-center gap-4 pt-3'>
                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="blue" name="show" value="yess" />
                        <label htmlFor="yess" className='text-sm'>Yes</label>
                    </div>

                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="yellow" name="show" value="noo" />
                        <label htmlFor="noo" className='text-sm'>No</label>
                    </div>
                </div>
            </div>


            <div className='flex justify-end items-center pt-16'>
        <button className='text-sm bg-lite text-white px-8 py-2'>Save</button>
      </div>
        </div>
    )
}

export default Datatable 