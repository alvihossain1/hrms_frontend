"use client"
import { getEmployeeAPI } from '@/lib/api';
import React, { useEffect, useState } from 'react'

export default function Employee() {

    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        fetchEmployees();
    }, [])

    async function fetchEmployees() {
        const response = await getEmployeeAPI();
        console.log("RES EMPLOYEE:: ", response);
        setEmployeeData(response);
    }

    let employee_list;
    if (employeeData.status === 200) {
        employee_list = <table className='table-fixed'>
        <thead className='bg-slate-700 text-slate-200'>
            <tr className='text-center'>
                <th className='p-3'>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Employee Status</th>
                <th>Department</th>
                <th>Position</th>
                <th>Hiring Date</th>
            </tr>
        </thead>
        <tbody>
            {
                employeeData.data.map(((employee) => (
                    <tr className='bg-slate-200 text-center border-b-2 border-slate-300'>
                        <td className='py-1 flex justify-center items-center'>                            
                            <div class="profile-pic-holder">
                                <img class="profile-pic rounded-full text-slate-200" src={`${process.env.SERVER_URL}/${employee.image_url}`} alt="Employee" />
                            </div>
                        </td>
                        <td>{employee.fname + " " + employee.lname}</td>
                        <td>{employee.email}</td>
                        <td>{employee.contactNo}</td>
                        <td>{employee.employeeStatus}</td>
                        <td>{employee.departmentName}</td>
                        <td>{employee.positionName}</td>
                        <td>{employee.hiringDate}</td>
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
