"use client"
import { getEmployeeAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { EmployeePDF } from '@/lib/employeeDataPdf';

export default function ViewEmployee() {

  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const targetRef = useRef();


  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    const response = await getEmployeeAPI();
    console.log("RES EMPLOYEE:: ", response);
    setEmployeeData(response);
  }

  let emp_list;
  if (employeeData.status === 200) {
    emp_list = employeeData.data.filter(emp => {
      if (emp.email.toLowerCase().includes(searchInput.toLowerCase()) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput.toLowerCase())) { return emp };
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
            <button onClick={() => setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1)} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>View <FontAwesomeIcon icon={faFile}></FontAwesomeIcon></button>
          </div>
        </div>
        {selectedId === emp.employeeId ? cardComponent(emp) : ""}
      </div>
    )))
  }

  function cardComponent(emp) {
    return (
      <div ref={targetRef} className='grid grid-cols-12 mx-0 my-3 md:mx-2 p-2 md:p-4 border-2 border-slate-200 text-slate-700'>
        <div className='col-span-12 md:col-span-6 flex flex-col gap-2.5 '>
          <h3 className='my-1'>Employee Record</h3>
          <p className='text-sm'><span className='font-bold'>Name:</span> {emp.fname} {emp.lname}</p>
          <p className='text-sm'><span className='font-bold'>Email:</span> {emp.email}</p>
          <p className='text-sm'><span className='font-bold'>Contact Number:</span> {emp.contactNo}</p>
          <p className='text-sm'><span className='font-bold'>Address:</span> {emp.address}</p>
          <p className='text-sm'><span className='font-bold'>State:</span> {emp.stateName}</p>
          <p className='text-sm'><span className='font-bold'>Gender:</span> {emp.gender}</p>
          <p className='text-sm'><span className='font-bold'>Date-Of-Birth:</span> {dateFormat(emp.dob)}</p>
          <p className='text-sm'><span className='font-bold'>Department Name:</span> {emp.departmentName}</p>
          <p className='text-sm'><span className='font-bold'>Position Name:</span> {emp.positionName}</p>
          <p className='text-sm'><span className='font-bold'>Employee Status:</span> <span className={`px-2 py-1 text-slate-50 text-xs font-bold rounded-2xl ${emp.employeeStatus.toLowerCase() === "active" ? "bg-green-600" : emp.employeeStatus.toLowerCase() === "leave" ? "bg-red-600" : "bg-yellow-600"}`}>{emp.employeeStatus}</span></p>
          <p className='text-sm'><span className='font-bold'>Hiring Date:</span> {dateFormat(emp.hiringDate)}</p>
          <p className='text-sm'><span className='font-bold'>Termination Date:</span> {dateFormat(emp.terminationDate)}</p>
          <p className='text-sm'><span className='font-bold'>Created:</span> {new Date(emp.createdAt).toUTCString()}</p>
          <p className='text-sm'><span className='font-bold'>Last Update:</span> {new Date(emp.updatedAt).toUTCString()}</p>

          {emp?.salary_tbl !== null ? <div className='p-2 flex flex-col gap-1 border-2 border-slate-200'>
            <h6 className='mb-1.5'>Salary Details</h6>
            <p className='text-sm'><span className='font-bold'>Base Salary:</span> {emp.salary_tbl.baseSalary}</p>
            <p className='text-sm'><span className='font-bold'>Bonus Salary:</span> {emp.salary_tbl.bonus}</p>
            <p className='text-sm'><span className='font-bold'>Allowance Salary:</span> {emp.salary_tbl.allowance}</p>
            <p className='text-sm'><span className='font-bold'>Benefits Salary:</span> {emp.salary_tbl.benefits}</p>
            <p className='text-sm'><span className='font-bold'>Total Salary:</span> {emp.salary_tbl.total}</p>
          </div> : <div className='p-2 flex flex-col gap-1 border-2 border-slate-200'><p className='text-sm font-bold text-red-600'>No salary Info</p></div>}

          <div className='mt-2 flex gap-2'>
            <PDFDownloadLink document={<EmployeePDF emp={emp}/>} fileName={`employee_${emp.fname}_${emp.lname}`}>
              <button className='px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Download Data</button>
            </PDFDownloadLink>
          </div>
        </div>
        <div className='col-span-12 md:col-span-6 flex justify-start md:justify-end'>
          <div className='overflow-hidden w-[30vh] h-[30vh] md:w-[40vh] md:h-[40vh] my-1 md:m-0 box-shadow-1'>
            <img className='h-full w-full object-cover object-center' src={emp.image_url} />
          </div>
        </div>
        {/* <div className='col-span-12'>
          <PDFViewer>
            <EmployeePDF emp={emp} />
          </PDFViewer>
        </div> */}
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
      <div>
        <h3 className='text-slate-800'>View Employee Records</h3>
      </div>
      <div>
        <p className='my-1'>Search an Employee by name or email</p>
        <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
      </div>
      <div>
        {employeeData.status === 200 ? emp_list : <div className='loader'></div>}
      </div>
    </div>
  )
}
