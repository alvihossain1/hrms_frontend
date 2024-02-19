// 'use client'
// import React from 'react'
// import Link from "next/link";
// import { useEffect, useState } from "react";


// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBars,
//     faCaretDown,
//     faCaretUp,
//     faClipboardUser,
//     faFile,
//     faHouse, faListCheck, faPen, faPerson, faPlus, faPowerOff, faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import CustomToast from '@/components/CustomToast';
// import Footer from '@/components/Footer';

// export default function Dashboard({ children }) {

//     const sidebarWidth = "300px"
//     const breakdown = 950;
//     const [screenWidth, setScreenWidth] = useState(0);
//     const [sidebar, setSidebar] = useState(true);
//     const [screenMargin, setScreenMargin] = useState(true)
//     const [employee, setEmployee] = useState(true);
//     const [attendance, setAttendance] = useState(false);
//     const [tasks, setTasks] = useState(false);

//     function sideBarSwitch() {
//         if (window.innerWidth > breakdown) {
//             if (sidebar) {
//                 setSidebar(false);
//                 setScreenMargin(false);
//             }
//             else {
//                 setSidebar(true);
//                 setScreenMargin(true)
//             }
//         }
//         else {
//             if (sidebar) { setSidebar(false) }
//             else { setSidebar(true) }
//         }
//     }

//     function employeeBar() {
//         if (employee) { setEmployee(false) }
//         else { setEmployee(true) }
//     }
//     function attendanceBar() {
//         if (attendance) { setAttendance(false) }
//         else { setAttendance(true) }
//     }
//     function tasksBar() {
//         if (tasks) { setTasks(false) }
//         else { setTasks(true) }
//     }

//     useEffect(() => {
//         setScreenWidth(window.innerWidth);
//         if (window.innerWidth > 950) {
//             setSidebar(true)
//             setScreenMargin(true)
//         }
//         else {
//             setSidebar(false)
//             setScreenMargin(false)
//         }
//     }, [])

//     return (
//         <main className="main">
//             <div className="relative min-h-screen flex bg-slate-200">
//                 <div id="notification-content" className='fixed top-12'><CustomToast /></div>

//                 <div id="sidebar" className="sidebar h-screen fixed top-0 left-0 right-0 bottom-0 bg-slate-800 text-slate-200" style={{ width: sidebar ? sidebarWidth : "0px" }}>
//                     <div className="flex flex-col overflow-hidden">
//                         <div className="min-h-[11vh] md:min-h-[9vh] flex justify-center items-center">
//                             <Link href="/">
//                                 <h3 className="text-center"><span className="text-purple-500">HRM</span> System</h3>
//                             </Link>
//                         </div>
//                         <ul>
//                             {/* <!-- Close --> */}
//                             <li className={`px-3 py-1 md:hidden ${screenWidth < breakdown ? "" : "hidden"}`} onClick={() => { sideBarSwitch() }}>
//                                 <button className="flex items-center w-full gap-2 p-3 rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <i className="fa-solid fa-xmark"></i>
//                                     <p className="text-md">Close</p>
//                                 </button>
//                             </li>
//                             {/* <!-- Close --> */}
//                             <li className="px-3 pb-1">
//                                 <div className="border border-slate-300"></div>
//                             </li>
//                             <li className="px-3 py-1">
//                                 <Link href="/"
//                                     className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <FontAwesomeIcon icon={faHouse} />
//                                     <p>Dashboard</p>
//                                 </Link>
//                             </li>
//                             <li className="px-3 py-1">
//                                 <div className="border border-slate-300"></div>
//                             </li>
//                             {/* Employee Bar */}
//                             <li className="px-3 py-1">
//                                 <div onClick={() => employeeBar()}
//                                     className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <FontAwesomeIcon icon={faPerson} />
//                                     <p>Employee</p>
//                                     <FontAwesomeIcon className="ml-auto" icon={employee ? faCaretUp : faCaretDown} />
//                                 </div>
//                                 <div className={`rounded-lg overflow-hidden my-1 ${employee ? "" : "hidden"}`}>
//                                     <Link href="/employee/addEmployee"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faPlus} />
//                                         <p>Add Employee</p>
//                                     </Link>
//                                     <Link href="/employee/updateEmployee"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faPen} />
//                                         <p>Update Employee</p>
//                                     </Link>
//                                     <Link href="/employee/fireEmployee"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faTrash} />
//                                         <p>Fire Employee</p>
//                                     </Link>
//                                 </div>
//                             </li>
//                             {/* Attendance Bar */}
//                             <li className="px-3 py-1">
//                                 <div onClick={() => attendanceBar()}
//                                     className="flex items-center gap-2 p-3 w-full rounded-lg bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <FontAwesomeIcon icon={faClipboardUser} />
//                                     <p>Attendance</p>
//                                     <FontAwesomeIcon className="ml-auto" icon={attendance ? faCaretUp : faCaretDown} />
//                                 </div>
//                                 <div className={`rounded-lg overflow-hidden my-1 ${attendance ? "" : "hidden"}`}>
//                                     <Link href="/attendance/addAttendance"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faPlus} />
//                                         <p>Add Employee Attendance</p>
//                                     </Link>
//                                     <Link href="/attendance/viewAttendance"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faFile} />
//                                         <p>View Attendance Records</p>
//                                     </Link>
//                                 </div>
//                             </li>
//                             {/* Tasks Bar */}
//                             <li className="px-3 py-1">
//                                 <div onClick={() => tasksBar()}
//                                     className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <FontAwesomeIcon icon={faListCheck} />
//                                     <p>Tasks</p>
//                                     <FontAwesomeIcon className="ml-auto" icon={tasks ? faCaretUp : faCaretDown} />
//                                 </div>
//                                 <div className={`rounded-lg overflow-hidden my-1 ${tasks ? "" : "hidden"}`}>
//                                     <Link href="/tasks/assignTasks"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faPlus} />
//                                         <p>Assign Task</p>
//                                     </Link>
//                                     <Link href="/viewAssignedTask"
//                                         className="flex items-center gap-2 p-3 bg-slate-200 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 text-slate-800 cursor-pointer">
//                                         <FontAwesomeIcon icon={faFile} />
//                                         <p>View Assiged Tasks</p>
//                                     </Link>
//                                 </div>
//                             </li>
//                             <li className="px-3 py-1">
//                                 <Link href="/logout"
//                                     className="flex items-center gap-2 p-3 rounded-lg p-3 bg-slate-800 hover:bg-purple-500 transition-all duration-300 text-slate-200 cursor-pointer">
//                                     <FontAwesomeIcon icon={faPowerOff} />
//                                     <p>Logout</p>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 <div id="navbar" className="navbar min-h-[11vh] md:min-h-[9vh] fixed top-0 right-0 left-0 flex p-2 bg-slate-800" style={{ marginLeft: screenMargin ? sidebarWidth : "0px" }}>
//                     <div className="w-full flex">
//                         <div className="profile-content px-2 md:px-5 flex items-center gap-2">
//                             <div className="profile-pic-holder">
//                                 <img className="profile-pic rounded-full"
//                                     src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" />
//                             </div>
//                             <p className="text-slate-200">HR James Charles</p>
//                         </div>
//                     </div>
//                     <div onClick={() => { sideBarSwitch() }}
//                         className="sidebar-switch p-3 px-5 flex items-center text-slate-200 hover:bg-purple-500 transition-all duration-200 cursor-pointer">
//                         <FontAwesomeIcon icon={faBars} size="xl" />
//                     </div>
//                 </div>

//                 {/* <!-- ACTUAL CONTENT INSIDE HERE --> */}
//                 <div id="data-content" className="data-content mt-[11vh] md:mt-[9vh] side-section w-full text-slate-200 p-2.5" style={{ marginLeft: screenMargin ? sidebarWidth : "0px" }}>
//                     {children}
//                 </div>
//                 {/* <!-- ACTUAL CONTENT INSIDE HERE END --> */}

//             </div>
//             <Footer />
//         </main>
//     )
// }
