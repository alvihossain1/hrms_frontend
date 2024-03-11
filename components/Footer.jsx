import React from 'react'

export default function Footer() {
    return (
        <div className='p-3 flex gap-3 justify-end bg-slate-700 text-slate-200'>
            <div className='flex flex-col justify-center'>
                <p className='text-md'>Created by - Alvi Noor Hossain</p>
                <p className='text-sm text-slate-300'>For {process.env.ORG_NAME}</p>
                <p className='text-xs text-slate-300'>Address: {process.env.ORG_ADDRESS}</p>
            </div>
            <img className="w-20 rounded-lg shadow-md shadow-slate-500" src={process.env.ORG_IMAGE} />
        </div>
    )
}
