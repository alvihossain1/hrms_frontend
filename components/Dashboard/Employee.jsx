"use client"
import React from 'react'

export default function Employee({employeeData}) {

    let employee_list;
    if (employeeData.status === 200) {
        employee_list = <table className='table-fixed'>
        <thead className='bg-slate-700 text-slate-200'>
            <tr className='text-center'>
                <th className='p-2.5'><p className='text-sm font-bold'>Profile</p></th>
                <th><p className='text-sm font-bold'>Name/Email</p></th>
                <th><p className='text-sm font-bold'>Contact</p></th>
                <th><p className='text-sm font-bold'>Employee Status</p></th>
                <th><p className='text-sm font-bold'>Department</p></th>
                <th><p className='text-sm font-bold'>Position</p></th>
                <th><p className='text-sm font-bold'>Hiring Date</p></th>
            </tr>
        </thead>
        <tbody>
            {
                employeeData.data.map(((emp) => (
                    <tr key={emp.employeeId} className={`bg-slate-50 text-center text-slate-600 border-b-2 border-slate-200`}>
                        <td className='py-1 flex justify-center items-center'>                            
                            <div className="profile-pic-holder-sm">
                                <img className="profile-pic rounded-full text-slate-200" src={emp.image_url} alt="Employee" />
                            </div>
                        </td>
                        <td>
                            <p className=' text-sm font-bold'>{emp.fname} {emp.lname}</p>
                            <p className='text-sky-600 text-xs font-bold'>{emp.email}</p>
                        </td>
                        <td><p className='text-sm font-bold'>{emp.contactNo}</p></td>
                        <td><p className={`${emp.employeeStatus.toLowerCase() === "active" ? "bg-green-600" : emp.employeeStatus.toLowerCase() === "leave" ? "bg-red-600" : "bg-yellow-600"} p-1.5 text-xs font-bold text-slate-50 inline rounded-2xl`}>{emp.employeeStatus}</p></td>
                        <td><p className='text-sm font-bold'>{emp.departmentName}</p></td>
                        <td><p className='text-sm font-bold'>{emp.positionName}</p></td>
                        <td><p className='text-sm font-bold'>{emp.hiringDate}</p></td>
                    </tr>
                )))
            }
        </tbody>
    </table>
    }
    else if (employeeData.status === 0) {
        employee_list = <div className="p-3 mx-1 bg-slate-200 text-slate-800 flex justify-center items-center">
            <h5>No Employee Data</h5>
        </div>
    }
    else if (employeeData.status === 500 || employeeData.status === 400) {
        employee_list = <div className="p-3 mx-1 bg-pink-200 flex justify-center items-center">
            <p>Couldn&apos;t Fetch Data, Error Status: {employeeData.status}</p>
        </div>
    }
    else {
        employee_list = <div className="p-4 mx-1 text-slate-800">
            <div className="loader"></div>
        </div>
    }

    return (
        <>
            {employee_list}
        </>
    )
}
