"use client"
import { getEmployeeByDateAttendedAPI } from '@/lib/api';
import { dateFormat, defaultDateNow } from '@/lib/dateFormat';
import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddAttendance() {

    const [employeeData, setEmployeeData] = useState({});

    const [searchInput, setSearchInput] = useState("");
    const [selectedId, setSelectedId] = useState(-1);

    // INPUT
    const [date, setDate] = useState(defaultDateNow());

    useEffect(() => {
        fetchEmployeesByDate(date);
    }, [])

    async function fetchEmployeesByDate(date) {
        const response = await getEmployeeByDateAttendedAPI(date);
        console.log("RES EMPLOYEE BY DATE:: ", response);
        setEmployeeData(response);
    }

    async function submitDate(e){
        e.preventDefault();
        setDate(e.target.value);
        if(e.target.value.length !== 0){
            fetchEmployeesByDate(e.target.value); 
        }
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
                        <button onClick={() => setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1)} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>View <FontAwesomeIcon icon={faUsersViewfinder}></FontAwesomeIcon></button>
                    </div>
                </div>
                {selectedId === emp.employeeId ? cardComponent(emp) : ""}
            </div>
        )))
    }

    function cardComponent(emp) {
        return (
            <div className='grid grid-cols-12 mx-0 my-3 md:mx-2 p-2 md:p-4 border-2 border-slate-200 text-slate-700 gap-y-2'>
                <div className='col-span-12'>
                    <h5 className='my-1'>Attendance of <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>
                    <p className='text-sm'><span className='font-bold'>Date:</span> {dateFormat(emp.attendance_tbls[0].date)}</p>
                    <p className='text-sm'><span className='font-bold'>Clock in Time:</span> {emp.attendance_tbls[0].clockInTime}</p>
                    <p className='text-sm'><span className='font-bold'>Clock out Time:</span> {emp.attendance_tbls[0].clockOutTime}</p>
                    <p className='text-sm'><span className='font-bold'>Hours Worked:</span> {emp.attendance_tbls[0].hoursWorked}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
            <div>
                <h3 className='text-slate-800'>View Employee Attendance</h3>
            </div>
            <div>
                <p className='my-1'>Search an Employee by name or email</p>
                <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
            </div>
            <div>
                <div className='mb-2 flex flex-wrap justify-between items-center'>
                    <h6 className='text-slate-700'>Attendance on - {dateFormat(date)}</h6>
                    <div className='flex gap-2'>
                        <p className='text-sm font-bold my-auto'>Change Date:</p>
                        <input type='date' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => submitDate(e)} value={date} />                       
                    </div>
                </div>
                {employeeData.status === 200 ? emp_list : employeeData.status === 0 ? <div className='my-2'><p className='text-sm font-bold text-red-700'>No attendance record on {dateFormat(date)}</p></div> : <div className='loader'></div>}
            </div>
        </div>
    )
}
