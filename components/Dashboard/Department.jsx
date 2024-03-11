"use client"
import { deleteDepartmentAPI, getDepartmentsAPI, addDepartmentAPI } from "@/lib/api";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"


export default function Department() {
  const { data: session } = useSession();

  const [departmentData, setDepartmentData] = useState({});
  const [deptNameInput, setDeptNameInput] = useState("");

  useEffect(() => {
    fetchDepartments()
  }, [])


  async function fetchDepartments() {
    const response = await getDepartmentsAPI();
    console.log("RES DEPT:: ", response)
    setDepartmentData(response);
  }

  async function handleAddDepartment(e) {
    e.preventDefault()
    if (!deptNameInput) {
      toast.warning("Input is empty");
      return;
    }
    let data = { departmentName: deptNameInput, name: session?.user?.name }
    const response = await addDepartmentAPI(data);
    if (response.status === 200) {
      toast.success(response.data);
      e.target.reset();
      setDeptNameInput("");
      fetchDepartments()
    }
    else if(response.status === 300){
      toast.warning(response.data);
    }
    else {
      toast.error(response.data)
    }
  }

  async function handleDeleteDepartment(dept) {
    const response = await deleteDepartmentAPI(dept.department_id);
    if (response.status === 200) {
      toast.success(`${dept.departmentName} department deleted successfully.`);
      fetchDepartments();
    }
    else if(response.status === 300){
      toast.warning("Nothing to delete");
    }
    else {
      toast.error("There was an error.")
    }
  }

  let dept_list;
  if (departmentData.status === 200) {
    dept_list = departmentData.data.map(((dept) => (
      <li key={dept.department_id} className="py-1 border-b-2 border-slate-200 flex justify-between items-center">
        <p className="text-lg">{dept.departmentName}</p>
        <FontAwesomeIcon onClick={() => { handleDeleteDepartment(dept) }} className="px-2 hover:text-purple-500 cursor-pointer transition-all duration-300 ease" icon={faTrash}></FontAwesomeIcon>
      </li>
    )))
  }
  else if (departmentData.status === 0) {
    dept_list = <div className="p-3 mx-1 bg-slate-200 text-slate-800 flex justify-center items-center">
      <h5>No data Recorded</h5>
    </div>
  }
  else if (departmentData.status === 500 || departmentData.status === 400) {
    dept_list = <div className="p-3 mx-1 bg-pink-200 flex justify-center items-center">
      <p>Couldn&apos;t Fetch Data, Error Status: {departmentData.status}</p>
    </div>
  }
  else {
    dept_list = <div className="p-4 mx-1 text-slate-800">
      <div className="loader"></div>
    </div>
  }

  return (
    <form onSubmit={(e) => { handleAddDepartment(e) }}>
      <h3 className="my-2">Add Departments</h3>
      <div>
        <div className="flex gap-2">
          <input className="w-full py-1.5 px-2 border-2 border-slate-300 caret-purple-500 focus:outline-none focus:border-purple-500 rounded-md" onChange={(e) => { setDeptNameInput(e.target.value) }} value={deptNameInput} />
          <button type="submit" className="py-1.5 px-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease shadow-md shadow-slate-400 rounded-md text-md">Add Department</button>
        </div>
        <div className="pt-5 text-slate-800">
          <h4>Added Departments {departmentData.status === 200 ? departmentData.data.length : ""}</h4>
          <div className="py-3">
            {dept_list}
          </div>
        </div>
      </div>
    </form>
  )
}
