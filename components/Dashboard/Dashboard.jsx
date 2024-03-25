'use client'
import React from 'react'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCaretDown,
    faCaretUp,
    faClipboardUser,
    faFile,
    faHouse, faListCheck, faPlus, faPowerOff, faXmark, faUserGroup, faUserPlus, faUserPen, faHandHoldingDollar, faSackDollar, faMoneyCheckDollar, faUserCheck, faEraser,
} from "@fortawesome/free-solid-svg-icons";
import Footer from '@/components/Footer';
import { signOut } from 'next-auth/react';
import CustomToast from '@/components/CustomToast';
import { useSession } from 'next-auth/react';

export default function Dashboard({ children }) {

    const sidebarWidth = "300px"
    const breakdown = 1000;
    const [screenWidth, setScreenWidth] = useState(0);
    const [sidebar, setSidebar] = useState(true);
    const [screenMargin, setScreenMargin] = useState(true)
    const [employee, setEmployee] = useState(true);
    const [attendance, setAttendance] = useState(false);
    const [salary, setSalary] = useState(false);
    const [tasks, setTasks] = useState(false);

    const [dropdownNav, setDropdownNav] = useState(false);

    const { data: session } = useSession();
    const router = useRouter();

    function sideBarSwitch() {
        if (window.innerWidth > breakdown) {
            if (sidebar) {
                setSidebar(false);
                setScreenMargin(false);
            }
            else {
                setSidebar(true);
                setScreenMargin(true)
            }
        }
        else {
            if (sidebar) { setSidebar(false) }
            else { setSidebar(true) }
        }
    }

    function employeeBar() {
        if (employee) { setEmployee(false) }
        else { setEmployee(true) }
    }
    function salaryBar() {
        if (salary) { setSalary(false) }
        else { setSalary(true) }
    }
    function attendanceBar() {
        if (attendance) { setAttendance(false) }
        else { setAttendance(true) }
    }
    function tasksBar() {
        if (tasks) { setTasks(false) }
        else { setTasks(true) }
    }

    function sidebarWidthControl() {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth > 950) {
            setSidebar(true)
            setScreenMargin(true)
        }
        else {
            setSidebar(false)
            setScreenMargin(false)
        }
    }

    useEffect(() => {
        sidebarWidthControl()
        window.addEventListener('resize', sidebarWidthControl);
        return () => {
            window.removeEventListener('resize', sidebarWidthControl);
        };
    }, []);

    function logOutOnClick() {
        signOut()
    }


    let profile = session?.user ?
        <div>
            <div className='flex items-center justify-center gap-1.5 cursor-pointer' onClick={() => {!dropdownNav ? setDropdownNav(true) : setDropdownNav(false)}}>
            <div className="profile-pic-holder">
                <img className="profile-pic rounded-full text-slate-200"
                    src={session.user.image} alt='Admin' />
            </div>
            <span className="bg-green-500 p-1 rounded-2xl inline"></span>
            <div className=''>
                <p className="pb-0.5 text-slate-300 font-bold"><span className='text-yellow-500'>HR.</span> {session?.user?.name}</p>
                <p className="text-slate-400 text-xs font-bold">{session?.user?.email}</p>
            </div>
            </div>
            <div className={`top-[10vh] md:top-[9vh] absolute py-2 px-3 bg-slate-800 text-slate-300 rounded-b-xl overflow-hidden ${!dropdownNav ? 'hidden' : ''}`}>
                <div className='overflow-hidden max-w-[200px] m-auto pb-1.5 text-sm font-bold border-b-2 border-slate-700'>
                    <img className='profile-pic rounded-md' src={session.user.image} alt='Admin'/>
                </div>
                <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>{session?.user?.name}</p>
                <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>{session?.user?.email}</p>
                <p className='px-3 py-1.5 my-0.5 text-sm font-bold border-b-2 border-slate-700'>Db_Id: <span className='text-purple-500'>{session?.user?.userId}</span></p>
                <p className='px-3 py-1.5 my-0.5 text-sm font-bold cursor-pointer hover:bg-purple-500 transition-all duration-300 ease' onClick={() =>logOutOnClick()}>Logout</p>
            </div>
        </div> :
        <div className='text-slate-300 text-md'><div className='loader'></div></div>


    return (
        <main className="main">
            <div className="relative min-h-screen flex bg-slate-200">
                <CustomToast />
                <div id="sidebar" className="sidebar h-screen fixed top-0 left-0 right-0 bottom-0 bg-slate-800 text-slate-200" style={{ width: sidebar ? sidebarWidth : "0px" }}>
                    <div className="flex flex-col overflow-hidden">
                        <div className="min-h-[11vh] md:min-h-[9vh] flex justify-center items-center">
                            <Link href="/dashboard">
                                <h3 className="text-center"><span className="text-purple-500">HRM</span> System</h3>
                            </Link>
                        </div>
                        <ul>
                            {/* <!-- Close --> */}
                            <li className={`px-3 py-2 md:hidden ${screenWidth < breakdown ? "" : "hidden"}`} onClick={() => { sideBarSwitch() }}>
                                <button className="flex items-center w-full gap-2 p-3 rounded-lg bg-slate-200 hover:bg-purple-500 transition-all duration-300 text-slate-800 cursor-pointer">
                                    <FontAwesomeIcon icon={faXmark} />
                                    <p className="text-md">Close</p>
                                </button>
                            </li>
                            {/* <!-- Close --> */}
                            <li className="px-3 pb-1">
                                <div className="border border-slate-300"></div>
                            </li>
                            <li className="px-3 py-1">
                                <Link href="/dashboard"
                                    className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faHouse} />
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className="px-3 py-1">
                                <div className="border border-slate-300"></div>
                            </li>
                            {/* Employee Bar */}
                            <li className="px-3 py-1">
                                <div onClick={() => employeeBar()}
                                    className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <p>Employee</p>
                                    <FontAwesomeIcon className="ml-auto" icon={employee ? faCaretUp : faCaretDown} />
                                </div>
                                <div className={`rounded-lg overflow-hidden my-1 ${employee ? "" : "hidden"}`}>
                                    <Link href="/dashboard/viewEmployee"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faUserCheck} />
                                        <p>View Employee</p>
                                    </Link>
                                    <Link href="/dashboard/updateEmployee"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faUserPen} />
                                        <p>Update Employee</p>
                                    </Link>
                                    <Link href="/dashboard/addEmployee"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faUserPlus} />
                                        <p>Add Employee</p>
                                    </Link>
                                </div>
                            </li>
                            {/* Salary Bar */}
                            <li className="px-3 py-1">
                                <div onClick={() => salaryBar()}
                                    className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                                    <p>Salary</p>
                                    <FontAwesomeIcon className="ml-auto" icon={salary ? faCaretUp : faCaretDown} />
                                </div>
                                <div className={`rounded-lg overflow-hidden my-1 ${salary ? "" : "hidden"}`}>
                                    <Link href="/dashboard/addSalary"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faSackDollar} />
                                        <p>Add Employee Salary</p>
                                    </Link>
                                    <Link href="/dashboard/updateSalary"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faMoneyCheckDollar} />
                                        <p>Update Employee Salary</p>
                                    </Link>
                                </div>
                            </li>
                            {/* Attendance Bar */}
                            <li className="px-3 py-1">
                                <div onClick={() => attendanceBar()}
                                    className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faClipboardUser} />
                                    <p>Attendance</p>
                                    <FontAwesomeIcon className="ml-auto" icon={attendance ? faCaretUp : faCaretDown} />
                                </div>
                                <div className={`rounded-lg overflow-hidden my-1 ${attendance ? "" : "hidden"}`}>
                                    <Link href="/dashboard/addAttendance"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p>Add Employee Attendance</p>
                                    </Link>
                                    <Link href="/dashboard/addAttendanceManual"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faEraser} />
                                        <p>Add Attendance Manual</p>
                                    </Link>
                                    <Link href="/dashboard/viewAttendance"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faFile} />
                                        <p>View Attendance Records</p>
                                    </Link>
                                </div>
                            </li>
                            {/* Tasks Bar */}
                            <li className="px-3 py-1">
                                <div onClick={() => tasksBar()}
                                    className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faListCheck} />
                                    <p>Tasks</p>
                                    <FontAwesomeIcon className="ml-auto" icon={tasks ? faCaretUp : faCaretDown} />
                                </div>
                                <div className={`rounded-lg overflow-hidden my-1 ${tasks ? "" : "hidden"}`}>
                                    <Link href="/dashboard/assignTask"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p>Assign Task</p>
                                    </Link>
                                    <Link href="/dashboard/manageAssignedTasks"
                                        className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                        <FontAwesomeIcon icon={faFile} />
                                        <p>Manage Assiged Tasks</p>
                                    </Link>
                                </div>
                            </li>
                            <li className="px-3 py-1 w-100">
                                <div onClick={() => logOutOnClick()}
                                    className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faPowerOff} />
                                    <p>Logout</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="navbar" className="navbar min-h-[11vh] md:min-h-[9vh] fixed top-0 right-0 left-0 flex p-2 bg-slate-800" style={{ marginLeft: screenMargin ? sidebarWidth : "0px" }}>
                    <div className="w-full flex">
                        <div className="profile-content px-0.5 md:px-2 flex items-center gap-1.5 md:gap-2">
                            {profile}
                        </div>
                    </div>
                    <div onClick={() => { sideBarSwitch() }}
                        className="sidebar-switch px-2 md:px-5 px-5 flex items-center border-2 border-slate-700 rounded-lg text-slate-200 hover:bg-purple-500 hover:border-purple-500 transition-all duration-200 cursor-pointer">
                        <FontAwesomeIcon icon={faBars} size="xl" />
                    </div>
                </div>

                {/* <!-- ACTUAL CONTENT INSIDE HERE --> */}
                <div id="data-content" className="data-content mt-[11vh] md:mt-[9vh] side-section w-full text-slate-800 p-2.5" style={{ marginLeft: screenMargin ? sidebarWidth : "0px" }}>
                    {children}
                </div>
                {/* <!-- ACTUAL CONTENT INSIDE HERE END --> */}

            </div>
            <Footer />
        </main>
    )
}
