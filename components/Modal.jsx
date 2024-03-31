"use client"
import React, { useEffect, useState } from 'react'

export default function Modal({modal, setModal}) {

    const [visibility, setVisibility] = useState(modal.show);


    useEffect(() => {
        setVisibility(modal.show);
    })

    return (
        <div className={`fixed top-0 left-0 bottom-0 right-0 bg-slate-800/30 flex justify-center items-center ${!visibility ? "hidden" : ""}`}>
            <div className='w-full md:w-3/12 mx-1 bg-slate-200 p-3 border-4 border-slate-800'>
                <p className='mb-2 text-lg md:text-xl'>{modal.info}</p>
                <div className='flex gap-2'>
                <button onClick={() => setModal({show: false, result: false, info: ""})} className='px-3 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Cancel</button>
                <button onClick={() => setModal({show: false, result: true, info: ""})} className='px-3 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Confirm</button>

                </div>
            </div>
        </div>
    )
}
