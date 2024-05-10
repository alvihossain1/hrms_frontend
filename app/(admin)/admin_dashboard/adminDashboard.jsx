'use client'
import React, { useState } from 'react'
import CustomToast from '@/components/CustomToast'
import { faHome, faPowerOff, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'

export default function AdminDashboard({ children }) {

  const { data: session } = useSession();
  const [dropdownNav, setDropdownNav] = useState(false);

  async function logOutOnClick() {
    await signOut()
  }

  let profile = session?.user ?
    <div>
      <div className='flex items-center justify-center gap-1.5 cursor-pointer' onClick={() => { !dropdownNav ? setDropdownNav(true) : setDropdownNav(false) }}>
        <div className="profile-pic-holder">
          <img className="profile-pic rounded-full text-slate-200"
            src={session.user.image} alt='Admin' />
        </div>
        <span className="bg-green-500 p-1 rounded-2xl inline"></span>
        <div className=''>
          <p className="pb-0.5 text-slate-300 font-bold"><span className='text-yellow-500'>Admin: </span> {session?.user?.name}</p>
          <p className="text-slate-400 text-xs font-bold">{session?.user?.email}</p>
        </div>
      </div>
      <div className={`top-[10vh] md:top-[9vh] absolute py-2 px-3 bg-slate-800 text-slate-300 rounded-b-xl overflow-hidden ${!dropdownNav ? 'hidden' : ''}`}>
        <div className='overflow-hidden max-w-[200px] m-auto pb-1.5 text-sm font-bold border-b-2 border-slate-700'>
          <img className='profile-pic rounded-md' src={session.user.image} alt='Admin' />
        </div>
        <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>{session?.user?.name}</p>
        <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>{session?.user?.email}</p>
        <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>Db_Id: <span className='text-purple-500'>{session?.user?.userId}</span></p>
        <p className='px-3 py-1.5 my-0.5 text-sm font-bold cursor-pointer hover:bg-purple-500 transition-all duration-300 ease' onClick={() => logOutOnClick()}>Logout</p>
      </div>
    </div> :
    <div className='text-slate-300 text-md'><div className='loader'></div></div>

    return (
      <div>
        <CustomToast />
        <div>
          <div className="admin_navbar flex justify-around min-h-[11vh] md:min-h-[9vh] fixed top-0 right-0 left-0 flex p-2 bg-slate-800">
            <div className="flex">
              <div className="profile-content px-0.5 md:px-2 flex items-center gap-1.5 md:gap-2">
                {profile}
              </div>
            </div>
            <div onClick={() => { logOutOnClick() }}
              className="sidebar-switch px-2 md:px-5 px-5 flex items-center border-2 border-slate-700 rounded-lg text-slate-200 hover:bg-purple-500 hover:border-purple-500 transition-all duration-200 cursor-pointer">
              <FontAwesomeIcon icon={faPowerOff} size="xl" />
            </div>
          </div>

          <div className='bg-slate-200 min-h-screen text-slate-800 pt-[11vh] md:pt-[9vh]'>
            <h3 className='mt-5 mb-3 text-center'>Functions for Admin</h3>

            <div className='flex flex-wrap justify-center gap-3 p-3 my-3'>
              <Link href="/admin_dashboard" >
                <div className='flex gap-2 items-center bg-slate-700 text-slate-200 py-4 px-6 md:py-7 md:px-9 hover:bg-purple-500 hover:text-slate-200 hover:border-purple-500 transition-all duration-300 ease'>
                  <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                  <p className='text-base md:text-lg'>Home</p>
                </div>
              </Link>
              <Link href="/admin_dashboard/addHR">
                <div className='flex gap-2 items-center bg-slate-700 text-slate-200 py-4 px-6 md:py-7 md:px-9 hover:bg-purple-500 hover:text-slate-200 hover:border-purple-500 transition-all duration-300 ease'>
                  <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                  <p className='text-base md:text-lg'>Add HR</p>
                </div>
              </Link>
              <Link href="/admin_dashboard/viewEmployee">
                <div className='flex gap-2 items-center bg-slate-700 text-slate-200 py-4 px-6 md:py-7 md:px-9 hover:bg-purple-500 hover:text-slate-200 hover:border-purple-500 transition-all duration-300 ease'>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  <p className='text-base md:text-lg'>View Employee</p>
                </div>
              </Link>
            </div>

            <div className='py-5'>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
}
