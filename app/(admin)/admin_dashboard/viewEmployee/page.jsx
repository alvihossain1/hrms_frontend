'use client'
import { getAllHrUsers, getEmployeeMinFieldsAPI } from '@/lib/api'
import React, { useEffect, useState } from 'react'

export default function page() {

  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchEmployeeData();
  }, [])

  async function fetchEmployeeData(){
    const response = await getEmployeeMinFieldsAPI();
    console.log(response)
    setEmployeeData(response);
  }

  let emp_list;
  if (employeeData.status === 200) {
    emp_list = employeeData.data.filter(emp => {
      if (emp.email.toLowerCase().includes(searchInput.toLowerCase()) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput.toLowerCase())) { return emp };
    }
    ).map((emp) => ((
      <div key={emp.employeeId} className='bg-slate-50 p-2 border-2 border-slate-300'>
        <div className='flex items-center'>
          <div className='profile-pic-holder'>
            <img className='profile-pic rounded-full text-slate-200' src={emp.image_url} alt='profile image' />
          </div>
          <div className='mx-2'>
            <p className='text-slate-600 text-sm font-bold'>{emp.fname} {emp.lname}</p>
            <p className='text-sky-600 text-xs font-bold'>{emp.email}</p>
          </div>          
        </div>
      </div>
    )))
  }

  return (
    <div className='m-2'>
      <div className='bg-slate-50 py-2 md:px-2 text-slate-800 md:p-4 lg:p-8 rounded-3xl shadow-lg shadow-slate-400 w-full md:w-10/12 mx-auto'>
        <h4 className='my-2 text-center'>Home Page</h4>

        <div className='min-h-[20vh] text-slate-800 py-3 px-1 md:px-12'>
          <h5 className='mb-2'>Employee Users - {employeeData?.data?.length}</h5>
          <div className='flex flex-col gap-1'>            
            {emp_list}
          </div>
        </div>
      </div>
    </div>
  )
}
