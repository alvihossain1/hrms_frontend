"use client"
import { hrmRegisterAPI } from '@/lib/api';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
var bcrypt = require('bcryptjs');

export default function AddEmployee() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const modules = {dept_pos: true, viewEmployee: true, addEmployee: true, updateEmployee: true, salary: true, attendance: true, tasks: true, leave: true, statistics: true}
    const [moduleAccess, setModuleAccess] = useState(modules);

    const router = useRouter();

    useEffect(() => {
        console.log(moduleAccess);
    }, [moduleAccess])

    async function handleSubmit(e) {
        e.preventDefault();

        if (!profileImage) {
            toast.info("User must upload profile picture.");
            return;
        }
        else {

            var salt_rounds = bcrypt.genSaltSync(parseInt(process.env.SALT));
            var hash_password = await bcrypt.hashSync(password, salt_rounds);

            const formData = new FormData();
            const user = { fname, lname, email, password: hash_password, moduleAccess: JSON.stringify(moduleAccess) };
            formData.append("user", JSON.stringify(user));
            formData.append("image", profileImage);

            let response = await hrmRegisterAPI(formData);
            if (response.status === 200) {
                toast.success(response.data);
            }
            else if (response.status === 300) {
                toast.warning(response.data);
            }
            else if (response.status === 500) {
                toast.error(response.data);
            }
        }

    }

    return (
        <div className='m-2'>
            <div className='bg-slate-50 p-2 md:p-4 lg:p-8 rounded-3xl shadow-lg shadow-slate-400 w-full md:w-10/12 mx-auto'>
                <form onSubmit={(e) => handleSubmit(e)} className='grid grid-cols-12 gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 text-slate-800 p-3 md:py-12 md:px-12'>
                    <div className="col-span-12">
                        <h3 className="my-auto">Add an HR Employee</h3>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="flex flex-col w-full">
                            <label className="my-1">First Name</label>
                            <input
                                className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                type="text" onChange={(e) => { setFname(e.target.value) }} value={fname} required />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="flex flex-col w-full">
                            <label className="my-1">Last Name</label>
                            <input
                                className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                type="text" onChange={(e) => { setLname(e.target.value) }} value={lname} required />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col w-full">
                            <label className="my-1">Email</label>
                            <input
                                className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col w-full">
                            <label className="my-1">Password</label>
                            <input
                                className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                        </div>
                    </div>
                    <div className='col-span-12'>
                        <div className="flex flex-col w-full">
                            <label className="my-1">Upload Employee Image</label>
                            <input id='profileImage' className="hidden" type="file" accept='image/*' onChange={(e) => setProfileImage(e.target.files[0])} />
                            <div className='flex gap-2 border-2 border-slate-300 bg-white'>
                                <label className="py-2.5 px-2 border-r-2 bg-slate-700 text-slate-200 border-slate-300 hover:bg-purple-500 transition-all duration-300 ease flex items-center justify-center gap-1 text-md cursor-pointer" htmlFor="profileImage">Upload Image <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon></label>
                                <div className='overflow-hidden flex items-center'>
                                    <p className='text-slate-800 break-none'>{profileImage === "" ? "Choose an Image" : profileImage.name.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12'>
                        <h4 className="my-1">Module Access</h4>
                        <p>The modular access given to the particular HR</p>
                        <div className="flex flex-wrap gap-2 p-2">
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, dept_pos: e.target.checked }) }} defaultChecked/>
                                    <p>Add Departments and Positions</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <p>Employee</p>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, viewEmployee: e.target.checked }) }} defaultChecked/>
                                    <p>View Employee</p>
                                </div>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, addEmployee: e.target.checked }) }} defaultChecked/>
                                    <p>Add Employee</p>
                                </div>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, updateEmployee: e.target.checked }) }} defaultChecked/>
                                    <p>Update Employee</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, salary: e.target.checked }) }} defaultChecked/>
                                    <p>Salary</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, attendance: e.target.checked }) }} defaultChecked/>
                                    <p>Attendance</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, tasks: e.target.checked }) }} defaultChecked/>
                                    <p>Tasks</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, leave: e.target.checked }) }} defaultChecked/>
                                    <p>Leave</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 border-2 border-slate-400 p-2'>
                                <div className='flex gap-1'>
                                    <input type='checkbox' className='w-5' onChange={(e) => { setModuleAccess({ ...moduleAccess, statistics: e.target.checked }) }} defaultChecked/>
                                    <p>Statistics</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 flex justify-end">
                        <button type='submit' className="mt-2 py-3 px-4 md:px-8 bg-slate-700 text-slate-50 shadow-md shadow-slate-500 hover:bg-purple-500 transition-all duration-300 ease-linear">Register HR</button>
                    </div>
                </form>
            </div>

        </div>

    );
}
