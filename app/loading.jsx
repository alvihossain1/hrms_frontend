"use client"
export default function Loading() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center bg-slate-200'>
        <h1 className='text-slate-700 my-2'>Loading...</h1>
        <div className="loader"></div>
    </div>
  )
}