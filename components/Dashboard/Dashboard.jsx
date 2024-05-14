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
    faHouse, faListCheck, faPlus, faPowerOff, faXmark, faUserGroup, faUserPlus, faUserPen, faHandHoldingDollar, faSackDollar, faMoneyCheckDollar, faUserCheck, faEraser, faPersonRunning,
    faChartLine,
    faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import Footer from '@/components/Footer';
import { signOut } from 'next-auth/react';
import CustomToast from '@/components/CustomToast';
import { useSession } from 'next-auth/react';

export default function Dashboard({ children }) {

    const sidebarWidth = "300px"
    const breakdown = 1100;
    const [screenWidth, setScreenWidth] = useState(0);
    const [sidebar, setSidebar] = useState(true);
    const [screenLeftMargin, setScreenLeftMargin] = useState(true)
    const [employee, setEmployee] = useState(true);
    const [attendance, setAttendance] = useState(false);
    const [salary, setSalary] = useState(false);
    const [tasks, setTasks] = useState(false);
    const [leave, setLeave] = useState(false);

    const [dropdownNav, setDropdownNav] = useState(false);

    const { data: session } = useSession();

    function sideBarSwitch() {
        if (window.innerWidth > breakdown) {
            if (sidebar) {
                setSidebar(false);
                setScreenLeftMargin(false);
            }
            else {
                setSidebar(true);
                setScreenLeftMargin(true)
            }
        }
        else {
            if (sidebar) { setSidebar(false) }
            else { setSidebar(true) }
        }
    }

    function sidebarWidthControl() {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth > breakdown) {
            setSidebar(true)
            setScreenLeftMargin(true)
        }
        else {
            setSidebar(false)
            setScreenLeftMargin(false)
        }
    }

    useEffect(() => {
        sidebarWidthControl()
        window.addEventListener('resize', sidebarWidthControl);
        return () => {
            window.removeEventListener('resize', sidebarWidthControl);
        };
    }, []);

    async function logOutOnClick() {
        await signOut({ callbackUrl: '/login', redirect: true })
    }

    // useEffect(() => {
    //     fetchHRModule()
    // }, [])


    // async function fetchHRModule() {
    //     const response = await getHRModule(session?.user?.userId);
    //     console.log("RES Module:: ", response)
    //     setHrModule(response);
    // }


    let profile = session?.user ?
        <div>
            <div className='flex items-center justify-center gap-1.5 cursor-pointer' onClick={() => { !dropdownNav ? setDropdownNav(true) : setDropdownNav(false) }}>
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
        <main className="main">
            <div className="relative min-h-screen flex bg-slate-200">
                <CustomToast />
                <div id="sidebar" className="sidebar h-screen fixed top-0 left-0 right-0 bottom-0 bg-slate-800 text-slate-200 scrollbar scrollbar-sm" style={{ width: sidebar ? sidebarWidth : "0px" }}>
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
                                <div onClick={() => setEmployee(!employee)}
                                    className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <p>Employee</p>
                                    <FontAwesomeIcon className="ml-auto" icon={employee ? faCaretUp : faCaretDown} />
                                </div>
                                <div className={`rounded-lg overflow-hidden my-1 ${employee ? "" : "hidden"}`}>
                                    {session?.user?.module && JSON.parse(session?.user?.module).viewEmployee && (
                                        <Link href="/dashboard/viewEmployee"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faUserCheck} />
                                            <p>View Employee</p>
                                        </Link>
                                    )}
                                    {session?.user?.module && JSON.parse(session?.user?.module).updateEmployee && (
                                        <Link href="/dashboard/updateEmployee"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faUserPen} />
                                            <p>Update Employee</p>
                                        </Link>
                                    )}
                                    {session?.user?.module && JSON.parse(session?.user?.module).addEmployee && (
                                        <Link href="/dashboard/addEmployee"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faUserPlus} />
                                            <p>Add Employee</p>
                                        </Link>
                                    )}
                                </div>
                            </li>
                            {/* Salary Bar */}
                            {session?.user?.module && JSON.parse(session?.user?.module).salary && (
                                <li className="px-3 py-1">
                                    <div onClick={() => setSalary(!salary)}
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
                            )}
                            {/* Attendance Bar */}
                            {session?.user?.module && JSON.parse(session?.user?.module).attendance && (
                                <li className="px-3 py-1">
                                    <div onClick={() => setAttendance(!attendance)}
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
                                        <Link href="/dashboard/viewEmployeeAttendance"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faUserClock} />
                                            <p>View Monthly Attendance</p>
                                        </Link>
                                    </div>
                                </li>
                            )}

                            {/* Tasks Bar */}
                            {session?.user?.module && JSON.parse(session?.user?.module).tasks && (
                                <li className="px-3 py-1">
                                    <div onClick={() => setTasks(!tasks)}
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
                            )}
                            {session?.user?.module && JSON.parse(session?.user?.module).leave && (
                                <li className="px-3 py-1">
                                    <div onClick={() => setLeave(!leave)}
                                        className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                        <FontAwesomeIcon icon={faPersonRunning} />
                                        <p>Leave</p>
                                        <FontAwesomeIcon className="ml-auto" icon={leave ? faCaretUp : faCaretDown} />
                                    </div>
                                    <div className={`rounded-lg overflow-hidden my-1 ${leave ? "" : "hidden"}`}>
                                        <Link href="/dashboard/assignLeave"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faPlus} />
                                            <p>Assign Employee Leave</p>
                                        </Link>
                                        <Link href="/dashboard/manageLeave"
                                            className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
                                            <FontAwesomeIcon icon={faFile} />
                                            <p>Manage Employee Leave</p>
                                        </Link>
                                    </div>
                                </li>
                            )}
                            {/* Leave Bar */}

                            {/* Graphs */}
                            {session?.user?.module && JSON.parse(session?.user?.module).statistics && (
                                <li className="px-3 py-1 w-100">
                                    <Link href="/dashboard/statistics"
                                        className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
                                        <FontAwesomeIcon icon={faChartLine} />
                                        <p>Statistics</p>
                                    </Link>
                                </li>
                            )}

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

                <div id="navbar" className="navbar min-h-[11vh] md:min-h-[9vh] fixed top-0 right-0 left-0 flex p-2 bg-slate-800" style={{ marginLeft: screenLeftMargin ? sidebarWidth : "0px" }}>
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
                <div id="data-content" className="data-content mt-[11vh] md:mt-[9vh] side-section w-full text-slate-800 p-2.5" style={{ marginLeft: screenLeftMargin ? sidebarWidth : "0px" }}>
                    {/* <div>{session?.user?.module && <p className={`${JSON.parse(session?.user?.module).status ? 'flex' : ''}`}>asfasfsa </p>}</div> */}
                    {children}
                </div>
                {/* <!-- ACTUAL CONTENT INSIDE HERE END --> */}

            </div>
            <Footer />
        </main>
    )
}
