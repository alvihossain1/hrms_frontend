import React from 'react'

export default function Footer() {
    return (
        <div className='p-3 flex gap-3 justify-end bg-slate-700 text-slate-200'>
            <div className='flex flex-col justify-center'>
                <p className='text-md'>Created by - Alvi Noor Hossain</p>
                <p className='text-sm text-slate-300'>For Toma Construction & Co. Ltd</p>
                <p className='text-xs text-slate-300'>Address: Toma Tower, VIP Rd, Dhaka 1000</p>
            </div>
            <img className="w-20 rounded-lg shadow-md shadow-slate-500" src='https://media.licdn.com/dms/image/C560BAQG3SB1HcGLkOg/company-logo_200_200/0/1644473444607?e=2147483647&v=beta&t=G8qfsQ2pbGD23Xvwt28UVw5aGdv2xxHS2DJkWpnuobo' />
        </div>
    )
}
