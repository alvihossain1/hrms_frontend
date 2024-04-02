"use client"
import { assignLeaveAPI, getEmployeeMinFieldsAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function AssignLeave() {

  const { data: session } = useSession();
  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);

  // INPUT
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
 

  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    const response = await getEmployeeMinFieldsAPI();
    console.log("RES EMPLOYEE:: ", response);
    setEmployeeData(response);
  }

  async function handleSubmit(e, emp){
    e.preventDefault();
    const data = {employeeId: emp.employeeId, leaveType, leaveReason, startDate, endDate, hrmUserId: session?.user?.userId}
    console.log(data);

    if(!leaveType || !leaveReason || !startDate || !endDate){
      toast.info("Fill up all the fields")
      return;
    }

    const response = await assignLeaveAPI(data);
    if(response.status === 200){
      toast.success(response.data);
      setSelectedId(-1);
      setLeaveType(""); setLeaveReason(""); setStartDate(""); setEndDate("");
    }
    else{
      toast.error(response.data)
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
            <button onClick={() => setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1)} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Add <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
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
          <h5 className='my-1'>Assign Leave of <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>
        </div>
        <div className='col-span-12'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Leave Type:</p>
            <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setLeaveType(e.target.value)} value={leaveType}/>
          </div>
        </div>
        <div className='col-span-12'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-bold my-auto'>Leave Reason:</p>
            <textarea type='text' className='min-h-[20vh] md:min-h-[12vh] w-full md:w-7/12 py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500'  onChange={(e) => setLeaveReason(e.target.value)} value={leaveReason}></textarea>
          </div>
        </div>
        <div className='col-span-12'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Start Date:</p>
            <input type='date' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
          </div>
        </div>
        <div className='col-span-12'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>End Date:</p>
            <input type='date' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setEndDate(e.target.value)} value={endDate}/>
          </div>
        </div>
        <div className='col-span-12'>
          <div className='mt-2 flex flex-wrap gap-2'>
            <button onClick={(e) => handleSubmit(e, emp)}
              className='px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Assign Leave</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
      <div>
        <h3 className='text-slate-800'>Assign Leave</h3>
      </div>
      <div>
        <p className='my-1'>Search an Employee by name or email</p>
        <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
      </div>
      <div>
        <h6 className='mb-2 text-slate-700'>Add leave of Employee</h6>
        {employeeData.status === 200 ? emp_list : <div className='loader'></div>}
      </div>
    </div>
  )
}
