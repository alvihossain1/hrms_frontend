"use client"
import { addSalaryAPI, getEmployeeAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddSalary() {

  const [employeeData, setEmployeeData] = useState({});

  const [searchInput, setSearchInput] = useState("");
  const [selectedId, setSelectedId] = useState(-1);

  // INPUT
  const [baseSalary, setBaseSalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [benefits, setBenefits] = useState(0);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    fetchEmployees();
  }, [])

  useEffect(() => {
    let sum = parseFloat(baseSalary)+parseFloat(bonus)+parseFloat(allowance)+parseFloat(benefits);
    setTotal(sum);
  }, [baseSalary, bonus, allowance, benefits])

  async function fetchEmployees() {
    const response = await getEmployeeAPI();
    console.log("RES EMPLOYEE:: ", response);
    setEmployeeData(response);
  }

  async function handleSubmit(e, employeeId) {
    e.preventDefault();
    if(baseSalary === 0){
      toast.info("Enter Base Salary")
      return;
    }
    else if(!bonus || !allowance || !benefits){
      setBonus(0); setAllowance(0); setBenefits(0);
    }
    const data = { employeeId, baseSalary, bonus, allowance, benefits, total };
    const response = await addSalaryAPI(data);
    console.log(response);
    if(response.status === 200){
      toast.success("Salary Added");
      setBaseSalary(0); setBonus(0); setAllowance(0); setBenefits(0), setTotal(0);
      setSelectedId(-1);
      fetchEmployees();
    }
    else{
      toast.error(response.data);
    }
  }

  let emp_list;
  if (employeeData.status === 200) {
    emp_list = employeeData.data.filter(emp => {
      if ((emp.email.toLowerCase().includes(searchInput.toLowerCase()) || (emp.fname + " " + emp.lname).toLowerCase().includes(searchInput.toLowerCase())) && emp?.salary_tbl === null) { 
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
            <button onClick={() => setSelectedId(selectedId === -1 ? emp.employeeId : selectedId !== emp.employeeId ? emp.employeeId : -1)} className='px-4 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 rounded-sm transition-all duration-300 ease text-sm flex items-center gap-2 shadow-sm shadow-slate-500'>Add <FontAwesomeIcon icon={faHandHoldingDollar}></FontAwesomeIcon></button>
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
          <h5 className='my-1'>Add Salary of <span className='text-purple-500'>{emp.fname} {emp.lname}</span></h5>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Base Salary:</p>
            <input type='number' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setBaseSalary(e.target.value)} />
          </div>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Bonus:</p>
            <input type='number' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setBonus(e.target.value)} />
          </div>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Allowance:</p>
            <input type='number' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setAllowance(e.target.value)} />
          </div>
        </div>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex gap-2'>
            <p className='text-sm font-bold my-auto'>Benefits:</p>
            <input type='number' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => setBenefits(e.target.value)} />
          </div>
        </div>
        <div className='col-span-12'>
        <div className='mt-2 flex flex-wrap gap-2'>
          <p className='text-sm font-bold my-auto'>Total Salary: {total}</p>
        </div>
        </div>
        <div className='col-span-12'>
          <div className='mt-2 flex flex-wrap gap-2'>
            <button onClick={(e) => handleSubmit(e, emp.employeeId)}
              className='px-5 py-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease rounded-sm shadow-sm shadow-slate-500'>Add Salary</button>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='flex flex-col gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
      <div>
        <h3 className='text-slate-800'>Add Employee Salary</h3>
      </div>
      <div>
        <p className='my-1'>Search an Employee by name or email</p>
        <input className='w-full border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' type='text' onChange={(e) => { setSearchInput(e.target.value); setSelectedId(-1); }} value={searchInput} placeholder='Name or Email' />
      </div>
      <div>
        <h6 className='mb-2 text-slate-700'>Employee's with salaries not provided</h6>
        {employeeData.status === 200 ? emp_list : <div className='loader'></div>}
      </div>
    </div>
  )
}
