"use client"

import { getPosts } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"

export default function Page() {

  const[posts, setPosts] = useState([])
  const[status, setStatus] = useState(0)

  useEffect(() =>{
    fetchPosts()
  }, [])

  async function fetchPosts(){
    let res = await getPosts()
    console.log(res)
    setPosts(res.data)
    setStatus(res.status)
  }

  function addDepartment(){
    toast.success("Department Added!");
  }

  let blockPosts;
  if(status === 200){
    blockPosts = posts.map(((post) => (
      <div key={post.productID} className="p-4 mx-1 bg-slate-200 text-slate-800 shadow-md shadow-slate-300 rounded-lg">
        <p>{post.productID}</p>
        <p>{post.productName}</p>
      </div>
    )))
  }
  else if(status === 0){
    blockPosts = <div className="p-4 mx-1 text-slate-800">
      <p>Loading....</p>
    </div>
  }
  else{
    blockPosts = <div className="p-4 mx-1 bg-pink-200 flex justify-center items-center box-shadow-1">
      <p>Couldn&apos;t Fetch Data from the server</p>
    </div>
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
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
        <div className="col-span-12 lg:col-span-8 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 p-5">
          <h3 className="my-1">View Employee Records</h3>
          <p className="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, reiciendis.
            Recusandae minima architecto.</p>
            <div className="py-2 flex flex-col gap-3 overflow-auto" style={{maxHeight: "50vh"}}>
              {blockPosts}
            </div>
        </div>
        {/* ADD DEPARTMENTS */}
        <div className="col-span-12 lg:col-span-4 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 p-5">
          <h2 className="my-2">Add Departments</h2>
          <div>
            <div className="flex gap-2">
              <input className="w-full py-1.5 px-2 border-2 border-slate-300 caret-purple-500 focus:outline-none focus:border-purple-500 rounded-md"/>
              <button onClick={() => {addDepartment()}} className="py-1.5 px-2 bg-slate-700 text-slate-200 hover:bg-purple-500 transition-all duration-300 ease shadow-md shadow-slate-400 rounded-md text-md">
                <p>Add Department</p>
              </button>
            </div>
            <div className="pt-5 text-slate-800">
                <h3>Added Departments</h3>
                <ul className="py-3">
                  <li className="py-1 border-b-2 border-slate-200"><p className="text-lg">Accounting</p></li>
                  <li className="py-1 border-b-2 border-slate-200"><p className="text-lg">Accounting</p></li>
                  <li className="py-1 border-b-2 border-slate-200"><p className="text-lg">Accounting</p></li>
                  <li className="py-1 border-b-2 border-slate-200"><p className="text-lg">Accounting</p></li>
                </ul>
              </div>
          </div>
        </div>
      </div>

      

    </div>

  );
}
