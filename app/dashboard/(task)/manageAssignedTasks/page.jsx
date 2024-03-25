"use client"
import { deleteAssignedTasksAPI, getAssignedTasksAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ManageAssignedTask() {

  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);

  // INPUT

  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    const response = await getAssignedTasksAPI();
    console.log("RES EMPLOYEE MIN TASKS:: ", response);
    setEmployeeData(response);
  }

  async function deleteTask(e, taskId, employeeId) {
    e.preventDefault();
    const data = { taskId, employeeId }
    const response = await deleteAssignedTasksAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      fetchEmployees();
    }
    else {
      toast.error(response.data);
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
          <div className='flex justify-end flex-wrap ml-auto mr-1 gap-0.5 md:gap-2.5'>
            {emp?.task_tbls?.length !== 0 ?
              <div className='flex p-2 border-2 border-slate-300 text-slate-500'>
                <p className='text-xs font-bold'>Task: {emp.task_tbls.length}</p>
              </div> : "" }
            <div className=''>
              <button onClick={() => setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1)} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>View <FontAwesomeIcon icon={faFile}></FontAwesomeIcon></button>
            </div>
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
          <h5 className='my-1'>Tasks of <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>
        </div>
        {emp.task_tbls.length === 0 ?
          <div className='col-span-12'>
            <p className='text-sm font-bold'>No Tasks Assigned</p>
          </div>
          :
          emp.task_tbls.map(task => (((
            <div key={task.taskId} className='col-span-12'>
              <div className='border-2 border-slate-200 my-0.5 p-2'>
                <p className='text-sm'><span className='font-bold'>Task Name:</span> {task.taskName}</p>
                <p className='text-sm'><span className='font-bold'>Task Details:</span> {task.taskDetails}</p>
                <p className='text-sm'><span className='font-bold'>Due Date:</span> {dateFormat(task.dueDate)}</p>
                <div onClick={(e) => deleteTask(e, task.taskId, emp.employeeId)} className='mt-2'>
                  <button className='px-3 py-1 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Delete</button>
                </div>
              </div>
            </div>
          ))))
        }
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
      <div>
        <h3 className='text-slate-800'>Manage Employee Tasks</h3>
      </div>
      <div>
        <p className='my-1'>Search an Employee by name or email</p>
        <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
      </div>
      <div>
        <h6 className='mb-2 text-slate-700'>Manage Tasks</h6>
        {employeeData.status === 200 ? emp_list : <div className='loader'></div>}
      </div>
    </div>
  )
}
