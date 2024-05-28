'use client'
import { adminHRUpdateFieldsAPI, adminHRUpdateModuleAPI, adminHRUpdatePasswordAPI, getAllHrUsersAPI, removeHREmployeeAPI } from '@/lib/api'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
var bcrypt = require('bcryptjs');

export default function page() {

  const [hrUsersData, setHrUsersData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);
  const [isUpdate, setIsUpdate] = useState(false);

  const [resetPass, setResetPass] = useState(false);
  const [password, setPassword] = useState("");

  // INPUT
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  // MODULE
  const [showModule, setShowModule] = useState(false);
  const modules = { dept_pos: true, viewEmployee: true, addEmployee: true, updateEmployee: true, salary: true, attendance: true, tasks: true, leave: true, statistics: true }
  const [moduleAccess, setModuleAccess] = useState(modules);

  useEffect(() => {
    fetchAllHrUsers();
  }, [])

  async function fetchAllHrUsers() {
    const response = await getAllHrUsersAPI();
    console.log(response)
    setHrUsersData(response);
  }

  async function updateFieldsConfirm(e, user) {
    e.preventDefault();
    if (!fname || !lname || !email) {
      toast.info("Please fill all the fields");
      return;
    }
    const data = { userId: user.userId, fname, lname, email };
    const response = await adminHRUpdateFieldsAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      fetchAllHrUsers();
      setIsUpdate(false);
    }
    else {
      toast.error(response.data);
    }
  }

  async function updatePasswordConfirm(e, user) {
    e.preventDefault();
    if (!password) {
      toast.info("Please enter password");
      return;
    }
    let salt_rounds = bcrypt.genSaltSync(parseInt(process.env.SALT));
    let hash_password = await bcrypt.hashSync(password, salt_rounds);
    const data = { userId: user.userId, password: hash_password };

    const response = await adminHRUpdatePasswordAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      setResetPass(false);
    }
    else {
      toast.error(response.data);
    }
  }

  async function updateModuleConfirm(e, emp) {
    e.preventDefault();
    const data = { userId: emp.userId, moduleAccess: moduleAccess };

    const response = await adminHRUpdateModuleAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      setModuleAccess(modules);
      fetchAllHrUsers();
      setShowModule(false);
    }
    else {
      toast.error(response.data);
    }
  }

  function updateButtonOnClick(emp) {
    setFname(emp.fname); setLname(emp.lname);
    setEmail(emp.email);
    setIsUpdate(true)
  }

  async function removeEmployeeBtnOnClick(e, emp){
    e.preventDefault();
    const data = {userId: emp.userId, image_url: emp.image_url}
    const response = await removeHREmployeeAPI(data);
    if(response.status === 200){
      toast.success("Employee has been removed");
      setSelectedId(-1);
      fetchAllHrUsers();
    }
    else{
      toast.info("Delete was not processed.")
    }
  }

  let hr_list;
  if (hrUsersData.status === 200) {
    hr_list = hrUsersData.data.filter(emp => {
      if (emp.email.toLowerCase().includes(searchInput.toLowerCase()) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput.toLowerCase())) { return emp };
    }
    ).map((emp) => ((
      <div key={emp.userId} className='bg-slate-50 py-2.5 px-1 md:px-2 border-2 border-slate-300'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div className='profile-pic-holder'>
              <img className='profile-pic rounded-full text-slate-200' src={emp.image_url} alt='profile image' />
            </div>
            <div className='mx-2'>
              <p className='text-slate-600 text-sm font-bold'>{emp.fname} {emp.lname}</p>
              <p className='text-sky-600 text-xs font-bold'>{emp.email}</p>
            </div>
          </div>
          <div className='mx-2'>
            <button onClick={() => { setSelectedId(selectedId === -1 ? emp.userId : selectedId !== emp.userId ? emp.userId : -1); setIsUpdate(false); setResetPass(false); }} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Update <FontAwesomeIcon icon={faFile}></FontAwesomeIcon></button>
          </div>
        </div>
        {selectedId === emp.userId ? cardComponent(emp) : ""}
      </div>
    )))
  }

  function cardComponent(emp) {
    return (
      <div className='grid grid-cols-12 my-3 md:mx-2 p-2 md:p-4 border-2 border-slate-200 text-slate-700 gap-y-2'>
        <div className='col-span-12'>
          <h5 className='my-1'>Selected HR - <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>

          {!isUpdate ?
            <div className='pt-2 mt-2 border-t-2 border-slate-200'>
              <p className='text-sm my-auto'><span className='font-bold'>First Name:</span> {emp.fname}</p>
              <p className='text-sm my-auto'><span className='font-bold'>Last Name:</span> {emp.lname}</p>
              <p className='text-sm my-auto'><span className='font-bold'>Email:</span> {emp.email}</p>
              <div className='flex gap-2 mt-1'>
                <button onClick={() => { updateButtonOnClick(emp) }} className='py-1.5  px-3 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Update</button>
              </div>
            </div>
            :
            <div className='pt-2 mt-2 border-t-2 border-slate-200'>
              <div className='py-1 flex gap-2'>
                <p className='text-sm font-bold my-auto'>First Name:</p>
                <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setFname(e.target.value)} value={fname} />
              </div>
              <div className='py-1 flex gap-2'>
                <p className='text-sm font-bold my-auto'>Last Name:</p>
                <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setLname(e.target.value)} value={lname} />
              </div>
              <div className='py-1 flex gap-2'>
                <p className='text-sm font-bold my-auto'>Email:</p>
                <input type='email' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className='py-1 flex gap-2'>
                <button onClick={() => { setIsUpdate(false) }} className='py-1.5 px-3 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Close</button>
                <button onClick={(e) => { updateFieldsConfirm(e, emp) }} className='py-1.5  px-3 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Confirm</button>
              </div>
            </div>
          }

          {/* RESET PASSWORD */}
          <div className='mt-4 pt-2 border-t-2 border-slate-200'>
            <p className='text-sm font-bold my-auto'>Reset HR employee Password?</p>
            {resetPass && (
              <div>
                <div className='py-1 flex gap-2'>
                  <p className='text-sm font-bold my-auto'>New Password:</p>
                  <input type='text' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setPassword(e.target.value)} value={password} />
                  <button onClick={(e) => { updatePasswordConfirm(e, emp) }} className='py-1.5  px-3 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Confirm</button>
                </div>
              </div>
            )}
            <div className='mt-1'>
              <button onClick={() => setResetPass(!resetPass)} className='py-1.5  px-5 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>{!resetPass ? "Yes" : "Close"}</button>
            </div>
          </div>
          
          {/* MODULES */}
          <div className='mt-4 pt-2 border-t-2 border-slate-200'>
            <p className='text-sm font-bold my-auto'>Reset HR Module Access?</p>
            {showModule && (allModulesComponent(emp))}
            <div className='mt-1 flex gap-2'>
              <button onClick={() => {setShowModule(!showModule)}} className='py-1.5 px-5 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>{!showModule ? "Yes" : "Close"}</button>
              {showModule && <button onClick={(e) => {updateModuleConfirm(e, emp)}} className='py-1.5 px-4 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Confirm</button>}
            </div>
          </div>

          {/* REMOVE Employee */}
          <div className='mt-4 pt-2 border-t-2 border-slate-200'>
            <p className='text-sm font-bold my-auto'>Remove Employee?</p>
            <div className='mt-1'>
              <button onClick={(e) => removeEmployeeBtnOnClick(e, emp)} className='py-1.5 px-3 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Remove</button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  function allModulesComponent(emp){
    return (
      <div>
        <p className='text-sm'>Reset the modular access given to the particular HR</p>
        <div className='py-1'>
          <p className='text-sm'>Marked green are the modules which currently are accessible to the particular HR</p>
        </div>
        <div className="flex flex-wrap gap-2 py-2">
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, dept_pos: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.dept_pos ? 'text-green-600' : 'text-red-600'}`}>Add Departments and Positions</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <p>Employee</p>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, viewEmployee: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.viewEmployee ? 'text-green-600' : 'text-red-600'}`}>View Employee</p>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, addEmployee: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.addEmployee ? 'text-green-600' : 'text-red-600'}`}>Add Employee</p>
            </div>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, updateEmployee: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.updateEmployee ? 'text-green-600' : 'text-red-600'}`}>Update Employee</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, salary: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.salary ? 'text-green-600' : 'text-red-600'}`}>Salary</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, attendance: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.attendance ? 'text-green-600' : 'text-red-600'}`}>Attendance</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, tasks: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.tasks ? 'text-green-600' : 'text-red-600'}`}>Tasks</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, leave: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.leave ? 'text-green-600' : 'text-red-600'}`}>Leave</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
            <div className='flex gap-1'>
              <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, statistics: e.target.checked }) }} defaultChecked />
              <p className={`font-bold ${emp?.moduleAccess_tbl?.statistics ? 'text-green-600' : 'text-red-600'}`}>Statistics</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='m-2'>
      <div className='bg-slate-50 py-2 md:px-2 text-slate-800 md:p-4 lg:p-8 rounded-3xl shadow-lg shadow-slate-400 w-full md:w-10/12 mx-auto'>
        <h4 className='my-2 text-center'>Home Page</h4>

        <div className='min-h-[20vh] text-slate-800 py-3 px-1 md:px-12'>
          <h5 className='mb-2'>HR Users - {hrUsersData?.data?.length}</h5>
          <div className='flex flex-col gap-1'>
            {hr_list}
          </div>
        </div>
      </div>
    </div>
  )
}
