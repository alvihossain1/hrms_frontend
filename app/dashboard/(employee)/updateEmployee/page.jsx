"use client"
import { getDepartmentsAPI, getEmployeeAPI, getPositionsAPI, removeEmployeeAPI, updateEmployeeAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdateEmployee() {

  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [update, setUpdate] = useState(false);

  // UPDATES BELOW
  const bd_states = ["Dhaka", "Barishal", "Chattogram", "Khulna", "Rajshahi", "Rangpur", "Mymensingh", "Sylhet"];
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [profileImage, setProfileImage] = useState("");
  // Selects
  const [stateName, setStateName] = useState("Dhaka");
  const [employeeStatus, setEmployeeStatus] = useState("Active");
  const [departmentName, setDepartmentName] = useState("");
  const [positionName, setPositionName] = useState("");

  const [departmentData, setDepartmentData] = useState({});
  const [positionData, setPositionData] = useState({});

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchPositions();
  }, [])


  async function fetchEmployees() {
    const response = await getEmployeeAPI();
    console.log("RES EMPLOYEE:: ", response);
    setEmployeeData(response);
  }
  async function fetchDepartments() {
    const response = await getDepartmentsAPI();
    console.log("RES DEPT:: ", response)
    setDepartmentData(response);
  }
  async function fetchPositions() {
    const response = await getPositionsAPI();
    console.log("RES pos:: ", response)
    setPositionData(response);
  }

  async function updateButtonOnClick(e, emp){
    e.preventDefault();
    setUpdate(true);
    setFname(emp.fname); setLname(emp.lname);
    setAddress(emp.address); setContactNo(emp.contactNo);
    setEmployeeStatus(emp.employeeStatus);
    setDepartmentName(emp.departmentName); setPositionName(emp.positionName);
    setTerminationDate(emp.terminationDate);

  }

  async function confirmUpdateBtnOnClick(e, emp){
    e.preventDefault()
    const employeeId = emp.employeeId;
    const user = { employeeId, fname, lname, contactNo, address, stateName, employeeStatus, departmentName, positionName, terminationDate };
    console.log(user);
    const response = await updateEmployeeAPI(user);
    if(response.status === 200){
      toast.success(response.data);
      clearAllFields();
      fetchEmployees();
      setUpdate(false);
    }
    else{
      toast.info("Update was not processed.")
    }
  }

  async function removeEmployeeBtnOnClick(e, emp){
    e.preventDefault();
    const data = {employeeId: emp.employeeId, image_url: emp.image_url}
    const response = await removeEmployeeAPI(data);
    if(response.status === 200){
      toast.success("Employee has been removed");
      setUpdate(false);
      setSelectedId(-1);
      fetchEmployees();
    }
    else{
      toast.info("Delete was not processed.")
    }
  }

  function clearAllFields(){
    setFname(""); setLname(""); setContactNo(""); setAddress(""); setTerminationDate(""); 
    setProfileImage(""); setDepartmentName(""); setPositionName(""); setStateName("Dhaka");
    setEmployeeStatus("Active");
}

  // 
  let dept_list;
  if (departmentData.status === 200) {
      dept_list = departmentData.data.map((dept) => {
          return (
              <option key={dept.department_id} className="cursor-pointer text-slate-800">{dept.departmentName}</option>
          )
      })
  }
  let position_list;
  if (positionData.status === 200) {
      position_list = positionData.data.map((position) => {
          return (
              <option key={position.position_id} className="cursor-pointer text-slate-800">{position.positionName}</option>
          )
      })
  }
  // 

  let emp_list;
  if (employeeData.status === 200) {
    emp_list = employeeData.data.filter(emp => {
      if (emp.email.toLowerCase().includes(searchInput) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput)) { return emp };
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
            <button onClick={() => {setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1); clearAllFields()}} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Update <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
          </div>
        </div>
        {selectedId === emp.employeeId ? cardComponent(emp) : ""}
      </div>
    )))
  }

  function cardComponent(emp) {
    return (
      <div className='grid grid-cols-12 mx-0 my-3 md:mx-2 p-2 md:p-4 border-2 border-slate-200 text-slate-700'>
        {
          !update ? <div className='flex flex-col gap-2.5 col-span-12 md:col-span-6'>
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
            <div className='mt-2'>
              <button onClick={(e) => updateButtonOnClick(e, emp)}
                className='px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Update Data</button>
            </div>
          </div>
            :
            updateRecordComponent(emp)
        }
        <div className='col-span-12 md:col-span-6 flex justify-start md:justify-end'>
          <div className='overflow-hidden w-[30vh] h-[30vh] md:w-[40vh] md:h-[40vh] my-1 md:m-0 box-shadow-1'>
            <img className='h-full w-full object-cover object-center' src={emp.image_url} />
          </div>
        </div>
      </div>
    )
  }

  function updateRecordComponent(emp) {
    return (
      <div className='flex flex-col gap-2.5 col-span-12 md:col-span-6'>
        <h3 className='my-1'>Update Record</h3>
        <div className='flex gap-2'>
          <p className='text-sm font-bold my-auto'>First Name:</p>
          <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' value={fname} onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className='flex gap-2'>
          <p className='text-sm font-bold my-auto'>Last Name:</p>
          <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' value={lname} onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className='flex gap-2'>
          <p className='text-sm font-bold my-auto'>Change Address:</p>
          <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className='flex gap-2'>
          <p className='text-sm font-bold my-auto'>Change Termination Date:</p>
          <input type='date' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' value={terminationDate} onChange={(e) => setTerminationDate(e.target.value)} />
        </div>
        <div className='flex gap-2'>
          <p className='text-sm font-bold my-auto'>Change Number:</p>
          <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <p className="text-sm font-bold my-auto">Change State Name:</p>
          <select className="cursor-pointer py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
            type="text" onChange={(e) => { setStateName(e.target.value) }} value={stateName} >
            {bd_states.map(state => ((
              <option key={state} className="cursor-pointer text-slate-800">{state}</option>
            )))}
          </select>
        </div>
        <div className="flex gap-2">
          <p className="text-sm font-bold my-auto">Employee Status:</p>
          <select className="cursor-pointer py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
            type="text" onChange={(e) => { setEmployeeStatus(e.target.value) }} value={employeeStatus} >
            <option className="cursor-pointer text-slate-800">Active</option>
            <option className="cursor-pointer text-slate-800">Leave</option>
            <option className="cursor-pointer text-slate-800">On Hold</option>
          </select>
        </div>
        <div className="flex gap-2">
          <p className="text-sm font-bold my-auto">New Department:</p>
          <select className="cursor-pointer py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
            type="text" onChange={(e) => { setDepartmentName(e.target.value) }} value={departmentName} >
            <option className="cursor-pointer text-slate-800">** Please Select **</option>
            {dept_list}
          </select>
        </div>
        <div className="flex gap-2">
          <p className="text-sm font-bold my-auto">New Position:</p>
          <select className="cursor-pointer py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
            type="text" onChange={(e) => { setPositionName(e.target.value) }} value={positionName} >
            <option className="cursor-pointer text-slate-800">** Please Select **</option>
            {position_list}
          </select>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>          
          <button onClick={() => setUpdate(false)}
            className='px-10 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Cancel</button>
            <button onClick={(e) => confirmUpdateBtnOnClick(e, emp)}
            className='px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Confirm Update</button>
             <button onClick={(e) => removeEmployeeBtnOnClick(e, emp)}
            className='ml-auto px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Remove Employee</button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
      <div>
        <h3 className='text-slate-800'>Update Employee Record</h3>
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
