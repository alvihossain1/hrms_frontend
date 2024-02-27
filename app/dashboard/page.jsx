"use client"

import Department from "@/components/Dashboard/Department";
import Employee from "@/components/Dashboard/Employee";
import Position from "@/components/Dashboard/Position";
import { getEmployeeAPI } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Page() {

  const [employeeData, setEmployeeData] = useState({});


  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    const response = await getEmployeeAPI();
    console.log("RES EMPLOYEE:: ", response);
    setEmployeeData(response);
  }

  function employeeActiveCount() {
    let count = 0;
    employeeData.data.forEach(emp => {
      if (emp.employeeStatus.toLowerCase() === "active") {
        count++;
      }
    })
    return count;
  }

  function employeeLeaveCount() {
    let count = 0;
    employeeData.data.forEach(emp => {
      if (emp.employeeStatus.toLowerCase() === "leave") {
        count++;
      }
    })
    return count;
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 md:p-2">
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Registered Employees</h2>
          <h3 className="my-3">{employeeData.status === 200 ? employeeData.data.length : "..."}</h3>
          <p className="my-3">Total number of Employees in the system registered.</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Active Employees</h2>
          <h3 className="my-3">{employeeData.status === 200 ? employeeActiveCount() : "..."}</h3>
          <p className="my-3">Total number of Employees Active at the moment.</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Leave Employees</h2>
          <h3 className="my-3">{employeeData.status === 200 ? employeeLeaveCount() : "..."}</h3>
          <p className="my-3">Total number of Employees at Leave at the moment.</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Assigned Task</h2>
          <h3 className="my-3">0</h3>
          <p className="my-3">Total number of Employees assigned tasks at the moment.</p>
        </div>
        {/* VIEW EMPLOYEE RECORDS */}
        <div className="col-span-12 lg:col-span-12 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden">
          <div className="p-2.5 md:p-5 max-h-[55vh] overflow-auto scrollbar scrollbar-sm">
            <div className="flex flex-col">
              <Employee employeeData={employeeData} />
            </div>
          </div>
        </div>
        {/* --------- ADD DEPARTMENTS ---------- */}
        <div className="col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden">
          <div className="p-5 max-h-[50vh] overflow-auto scrollbar scrollbar-sm">
            <Department />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden">
          <div className="p-5 max-h-[50vh] overflow-auto scrollbar scrollbar-sm">
            <Position />
          </div>
        </div>

      </div>



    </div>

  );
}
