"use client"
import { getEmployeeMinFieldsAPI, getEmployeeMonthlyAttendance } from '@/lib/api';
import { dateFormat, defaultDateNow } from '@/lib/dateFormat';
import { faFile, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { EmployeeAttendancePDF } from '@/lib/employeeAttendancePdf';

export default function ViewEmployeeAttendance() {

    const [employeeData, setEmployeeData] = useState({});

    const [searchInput, setSearchInput] = useState("");
    const [selectedId, setSelectedId] = useState(-1);

    // INPUT
    const [date, setDate] = useState(`${defaultDateNow().split("-")[0]}-${defaultDateNow().split("-")[1]}`);
    const [attendanceData, setAttendanceData] = useState({});


    useEffect(() => {
        fetchEmployees();
    }, [])


    async function fetchEmployees() {
        const response = await getEmployeeMinFieldsAPI();
        console.log("RES EMPLOYEE:: ", response);
        setEmployeeData(response);
    }

    async function fetchEmployeeMonthlyAttendance(employeeId) {
        if (!date) {
            toast.info("Select Month");
            return;
        }
        const response = await getEmployeeMonthlyAttendance({ month: date, employeeId });
        console.log("RES Attendace Record:: ", response);
        setAttendanceData(response);
    }

    async function submitDate(e) {
        e.preventDefault();
        setDate(e.target.value);
    }

    let emp_list;
    if (employeeData.status === 200) {
        emp_list = employeeData.data.filter(emp => {
            if (emp.email.toLowerCase().includes(searchInput.toLowerCase()) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput.toLowerCase())) {
                return emp
            };
        }
        ).map((emp) => ((
            <div key={emp.employeeId} className='bg-slate-50 p-1 border-y border-slate-200 p-2'>
                <div className='flex items-center'>
                    <div className='profile-pic-holder'>
                        <img className='profile-pic rounded-full text-slate-200' src={emp.image_url} alt='profile image' />
                    </div>
                    <div className='mx-2'>
                        <p className='text-slate-600 text-sm font-bold'>{emp.fname} {emp.lname}</p>
                        <p className='text-sky-600 text-xs font-bold'>{emp.email}</p>
                    </div>
                    <div className='ml-auto mr-1'>
                        <button onClick={() => { setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1); setAttendanceData({}) }} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>View <FontAwesomeIcon icon={faFile}></FontAwesomeIcon></button>
                    </div>
                </div>
                {selectedId === emp.employeeId ? cardComponent(emp) : ""}
            </div>
        )))
    }

    function cardComponent(emp) {
        return (
            <div className='grid grid-cols-12 mx-0 my-3 md:mx-2 p-2 md:p-4 border-2 border-slate-200 text-slate-700'>
                <div className='col-span-12'>
                    <h5 className='my-1'>Attendance Report of <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>
                    <button onClick={(e) => { fetchEmployeeMonthlyAttendance(emp.employeeId) }} className='my-2 px-4 py-1.5 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Get Data</button>
                </div>
                <div className='col-span-12'>
                    <div className='flex flex-col'>
                        {attendanceData.status === 200 ?
                            <div className='md:p-3'>
                                <p className='mb-1 text-sm font-bold text-slate-800'>Present Days: {attendanceData.data.noOfDaysPresent} | Absent Days: {attendanceData.data.noOfDaysAbsent} | Off Days: {attendanceData.data.noOfDaysOff}</p>
                                <p className='mb-2 text-sm font-bold text-slate-800'>Attendance: <span className='text-green-600'>P</span> means Present, <span className='text-red-600'>A</span> means Absent, X means Offdays</p>
                                <div className='w-full text-center'>
                                    <div className='flex w-full border-y-2 border-slate-300 p-1'>
                                        <p className='text-sm w-full font-bold'>Date</p>
                                        <p className='text-sm w-full font-bold'>Day</p>
                                        <p className='text-sm w-full font-bold'>Clock In Time</p>
                                        <p className='text-sm w-full font-bold'>Clock Out Time</p>
                                        <p className='text-sm w-full font-bold'>Hours worked</p>
                                        <p className='text-sm w-full font-bold'>Present</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-center'>
                                    {attendanceData.data.records.map((data) => (((
                                        <div key={data.attendanceId} className='w-full'>
                                            <div className='flex w-full border-b-2 border-slate-300 p-1'>
                                                <p className='text-sm w-full'>{dateFormat(data.date)}</p>
                                                <p className='text-sm w-full'>{data.day}</p>
                                                <p className='text-sm w-full'>{data.clockInTime}</p>
                                                <p className='text-sm w-full'>{data.clockOutTime}</p>
                                                <p className='text-sm w-full'>{data.hoursWorked}</p>
                                                <div className='w-full text-center'>
                                                    <p className={`text-xs px-2 py-0.5 inline text-white font-bold rounded-full ${data.present === 'A' ? 'bg-red-600' : data.present === 'P' ? 'bg-green-600' : 'bg-slate-800'}`}>{data.present}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))))}
                                </div>
                                <PDFDownloadLink document={<EmployeeAttendancePDF emp={emp} attendanceData={attendanceData}/>} fileName={`attendance_${emp.fname}_${emp.lname}`}>
                                    <button className='mt-5 px-4 py-1.5 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Download Report</button>
                                </PDFDownloadLink>
                            </div>
                            : attendanceData?.status === 0 ? <div className='mt-1'><p className='text-sm font-bold'>No recorded attendance</p></div> : ""
                        }
                    </div>
                </div>

            </div>
        )
    }


    return (
        <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
            <div>
                <h3 className='text-slate-800'>View Monthly Attendance</h3>
            </div>
            <div>
                <p className='my-1'>Search an Employee by name or email</p>
                <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
            </div>
            <div>
                <div className='mb-2 flex flex-wrap justify-between items-center'>
                    <h6 className='text-slate-700'>Attendance on: {`${dateFormat(date+"-01").split(" ")[1]} ${dateFormat(date+"-01").split(" ")[2]}`}</h6>
                    <div className='flex gap-2'>
                        <p className='text-sm font-bold my-auto'>Change Month:</p>
                        <input type='month' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => submitDate(e)} value={date} />
                    </div>
                </div>
                {employeeData.status === 200 ? emp_list : employeeData.status === 0 ? <div className='my-2'><p className='text-sm font-bold text-red-700'>No attendance record on {dateFormat(date)}</p></div> : <div className='loader'></div>}
            </div>
        </div>
    )
}
