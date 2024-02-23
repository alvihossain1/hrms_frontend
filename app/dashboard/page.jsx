"use client"

import Department from "@/components/Dashboard/Department";
import Employee from "@/components/Dashboard/Employee";
import Position from "@/components/Dashboard/Position";

export default function Page() {

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Registered Employees</h2>
          <h3 className="my-3">45</h3>
          <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, ut</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Active Employees</h2>
          <h3 className="my-3">20</h3>
          <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, ut</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Leave Employees</h2>
          <h3 className="my-3">5</h3>
          <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, ut</p>
        </div>
        <div className="col-span-12 md:col-span-3 bg-slate-700 text-slate-200 p-5 rounded-lg">
          <h2 className="my-3">Assigned Task</h2>
          <h3 className="my-3">17</h3>
          <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, ut</p>
        </div>
        {/* VIEW EMPLOYEE RECORDS */}
        <div className="col-span-12 lg:col-span-12 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 p-2.5 md:p-5">
          <h3 className="my-1">View Employee Records</h3>
          <p className="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, reiciendis.
            Recusandae minima architecto.</p>
            <div className="py-2 flex flex-col gap-3 overflow-auto" style={{minHeight: "20vh", maxHeight: "40vh"}}>
              <Employee />
            </div>
        </div>
        {/* --------- ADD DEPARTMENTS ---------- */}
        <div className="col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 p-5">
        <Department />
        </div>
        <div className="col-span-12 lg:col-span-6 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 p-5">
        <Position />
        </div>
        
      </div>

      

    </div>

  );
}
