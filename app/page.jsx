import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-200 text-slate-800'>
      
      <div className='p-5 md:p-7 bg-slate-800 text-slate-300 rounded-xl shadow-lg shadow-slate-800 flex flex-col justiy-center items-center'>
        <h2 className='my-2'><span className='text-purple-500'>HRM</span> SYSTEM</h2>
        <p className='my-2 text-center'>A Human Resouce Management System to <br/>enlighten your working tasks and skills.</p>
        <p className='my-2 text-center text-sm'>By Alvi Noor Hossain</p>
        <div className='flex gap-2'>
        <Link href="/login">
          <button className="my-2 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease">Login HRM</button>
        </Link>
        <Link href="/signup">
          <button className="my-2 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease">SignUp HRM</button>
        </Link>
        </div> 
        <Link href="/dashboard">
          <button className="my-2 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease">Dashboard HRM Shortcut</button>
        </Link>       
      </div>
    </div>
  )
}
