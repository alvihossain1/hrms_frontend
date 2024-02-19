"use client"
import Link from "next/link"
export default function NotFound() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-slate-200'>
        <h1 className='text-slate-800 my-2'>404 -  Page Not Found</h1>
        <p className='text-slate-800 my-2 font-bold'>Sorry, the directory doesn&apos;t contain the specific page</p>
        <Link href="/dashboard">
          <button className="my-2 px-3 py-2 border-4 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-slate-200 text-md font-bold transition-all duration-300 ease">Redirect to Dashboard</button>
        </Link>
    </div>
  )
}
