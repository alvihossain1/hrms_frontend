import { faDiamondTurnRight, faGears, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
export default function Page() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-slate-200 text-slate-800 background-theme-base'>

      <div className='mx-1 p-5 md:p-7 bg-slate-800 text-slate-300 rounded-xl shadow-md shadow-purple-800 flex flex-col justiy-center items-center border-2 border-purple-800'>
        <h2 className='my-2'><span className='text-purple-500'>HRM</span> SYSTEM</h2>
        <p className='my-2 text-center'>A Human Resouce Management System to <br />enlighten your working tasks and skills.</p>
        <p className='mt-2 mb-3 text-center text-sm'>By Alvi Noor Hossain</p>
        <div className='w-full px-2'>
          <div className='mt-3'>
            <Link href="/login">
              <div className="flex gap-3 justify-center w-full my-2.5 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease">
                <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
                <p>HRM Login</p>
              </div>
            </Link>
            <Link href="/admin_login">
              <div className="flex gap-3 justify-center w-full my-2 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease">
                <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>
                <p>Admin Login</p>
              </div>
            </Link>
          </div>
          <div className='mt-4 pt-1 border-t-2 border-slate-700 flex gap-2'>
            <Link href="/dashboard">
              <div className="flex gap-2.5 justify-center items-center w-full my-2.5 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease text-sm">
                <FontAwesomeIcon icon={faDiamondTurnRight}></FontAwesomeIcon>
                <p className='text-sm'>HRM Dashboard <br /> Shortcut</p>
              </div>
            </Link>
            <Link href="/admin_dashboard">
              <div className="flex gap-2.5 justify-center items-center w-full my-2.5 border-2 border-purple-500 text-slate-200 px-3 py-2 hover:bg-purple-500 transition-all duration-300 ease text-sm">
                <FontAwesomeIcon icon={faDiamondTurnRight}></FontAwesomeIcon>
                <p className='text-sm'>Admin Dashboard <br /> Shortcut</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
