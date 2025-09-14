import React from 'react'

const Speed = () => {
    return (
        <div className='border border-slate-300 rounded-2xl p-5 flex flex-col gap-8'>
            <div>
                <p className='text-sm'>Enable optimize page speed?</p>
                <div className=' flex items-center gap-4 pt-3'>
                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="yes" name="speed" value="yes" />
                        <label htmlFor="yes" className='text-sm'>Yes</label>
                    </div>

                    <div className=' flex items-center gap-2'>
                        <input type="radio" id="no" name="speed" value="no" />
                        <label htmlFor="no" className='text-sm'>No</label>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center pt-16'>
        <button className='text-sm bg-lite text-white px-8 py-2'>Save</button>
      </div>

        
        </div>
    )
}

export default Speed