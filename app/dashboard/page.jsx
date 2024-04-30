'use client'

import Department from '@/components/Dashboard/Department';
import Employee from '@/components/Dashboard/Employee';
import Position from '@/components/Dashboard/Position';
import { getEmployeeAPI, getEmployeeByDateAttendedAPI } from '@/lib/api';
import { dateFormat, defaultDateNow } from '@/lib/dateFormat';
import { useEffect, useState } from 'react';

export default function Page() {

  const [employeeData, setEmployeeData] = useState({});
  const [attendanceData, setAttendanceData] = useState({});


  useEffect(() => {
    fetchEmployees();
    fetchAttendanceToday();
  }, [])

  async function fetchEmployees() {
    const response = await getEmployeeAPI();
    console.log('RES EMPLOYEE:: ', response);
    setEmployeeData(response);
  }

  async function fetchAttendanceToday() {
    const response = await getEmployeeByDateAttendedAPI(defaultDateNow());
    console.log('RES EMP Attendance::', response);
    setAttendanceData(response);
  }

  function employeeActiveCount() {
    let count = 0;
    employeeData.data.forEach(emp => {
      if (emp.employeeStatus.toLowerCase() === 'active') {
        count++;
      }
    })
    return count;
  }

  function employeeLeaveCount() {
    let count = 0;
    employeeData.data.forEach(emp => {
      if (emp.employeeStatus.toLowerCase() === 'leave') {
        count++;
      }
    })
    return count;
  }

  return (
    <div>
      <div className='grid grid-cols-12 gap-4 md:p-2'>
        <div className={`col-span-12 px-2 py-5 md:py-8 gap-1 flex flex-col justify-center items-center bg-slate-700 text-slate-200 rounded-lg ${employeeData.status === 400 || employeeData.status === 500 ? '' : 'hidden'}`}>
          <p className='text-center'>There has been a problem, clould not connect to the server, error status: {employeeData.status} </p>
          <p className='text-sm'>{employeeData?.error?.message}, {employeeData?.error?.name}</p>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg'>
          <h2 className='my-3'>Registered Employees</h2>
          <h3 className='my-3'>{employeeData.status === 200 ? employeeData.data.length : '...'}</h3>
          <p className='my-3'>Total number of Employees in the system registered.</p>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg'>
          <h2 className='my-3'>Active Employees</h2>
          <h3 className='my-3'>{employeeData.status === 200 ? employeeActiveCount() : '...'}</h3>
          <p className='my-3'>Total number of Employees Active at the moment.</p>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg'>
          <h2 className='my-3'>Leave Employees</h2>
          <h3 className='my-3'>{employeeData.status === 200 ? employeeLeaveCount() : '...'}</h3>
          <p className='my-3'>Total number of Employees at Leave at the moment.</p>
        </div>
        <div className='col-span-12 md:col-span-6 lg:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg'>
          <h2 className='my-3'>Today's Attendance</h2>
          <h3 className='my-3'>{attendanceData.status === 200 || attendanceData.status === 0 ? attendanceData.data.length : '..'} / {employeeData.status === 200 ? employeeData.data.length : '..'}</h3>
          <p className='my-3'>Total number of Employees who attended today on {dateFormat(Date.now())}</p>
        </div>
        {/* VIEW EMPLOYEE RECORDS */}
        <div className='col-span-12 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden'>
          <div className='p-2.5 md:p-5 max-h-[55vh] overflow-auto scrollbar scrollbar-sm'>
            <div className='flex flex-col'>
              <Employee employeeData={employeeData} />
            </div>
          </div>
        </div>
        {/* --------- ADD DEPARTMENTS ---------- */}
        <div className='col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden'>
          <div className='p-5 max-h-[50vh] overflow-auto scrollbar scrollbar-sm'>
            <Department />
          </div>
        </div>
        <div className='col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden'>
          <div className='p-5 max-h-[50vh] overflow-auto scrollbar scrollbar-sm'>
            <Position />
          </div>
        </div>

      </div>



    </div>

  );
}
