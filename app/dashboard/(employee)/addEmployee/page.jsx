"use client"
import { addEmployeeAPI, getDepartmentsAPI, getPositionsAPI } from '@/lib/api';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AddEmployee() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dob, setDob] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [hiringDate, setHiringDate] = useState("");
    const [terminationDate, setTerminationDate] = useState("");
    const [profileImage, setProfileImage] = useState("");
    // Selects
    const [departmentName, setDepartmentName] = useState(null);
    const [positionName, setPositionName] = useState(null);
    const [stateName, setStateName] = useState("Dhaka")
    const [gender, setGender] = useState("Male");
    const [employeeStatus, setEmployeeStatus] = useState("Active");

    const [departmentData, setDepartmentData] = useState({});
    const [positionData, setPositionData] = useState({});

    useEffect(() => {
        fetchDepartments();
        fetchPositions();
    }, [])

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

    async function handleSubmit(e) {
        e.preventDefault();
        if (!profileImage) {
            toast.info("User must upload profile picture.");
            return;
        }
        else {
            const formData = new FormData();
            const user = { fname, lname, dob, gender, contactNo, email, employeeStatus, address, stateName, departmentName, positionName, hiringDate, terminationDate };
            formData.append("user", JSON.stringify(user));
            formData.append("image", profileImage);

            let response = await addEmployeeAPI(formData);
            if (response.status === 200) {
                toast.success(response.data);
                e.target.reset();
            }
            else if (response.status === 500) {
                toast.error(response.data);
            }
            console.log(user);
        }

    }

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

    return (
        <div >
            <form onSubmit={(e) => handleSubmit(e)} className='grid grid-cols-12 gap-x-1.5 gap-y-5 md:gap-x-4 md:gap-y-10 rounded-xl text-slate-800 p-3 md:py-12 md:px-12 w-full md:w-10/12 mx-auto'>
                <div className="col-span-12">
                    <h2 className="my-auto">Register an Employee</h2>
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
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Contact Number</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="number" onChange={(e) => { setContactNo(e.target.value) }} value={contactNo} required />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Date of Birth</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="date" onChange={(e) => { setDob(e.target.value) }} value={dob} required />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Gender</label>
                        <select className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" onChange={(e) => { setGender(e.target.value) }} value={gender} defaultValue="Male" required >
                            <option className="cursor-pointer text-slate-800">Male</option>
                            <option className="cursor-pointer text-slate-800">Female</option>
                            <option className="cursor-pointer text-slate-800">Other</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className='border border-slate-300 mt-2'></div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Email</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Employee Status</label>
                        <select className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" onChange={(e) => { setEmployeeStatus(e.target.value) }} value={employeeStatus}  defaultValue="Active" required >
                            <option className="cursor-pointer text-slate-800">Active</option>
                            <option className="cursor-pointer text-slate-800">Leave</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Address</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" onChange={(e) => { setAddress(e.target.value) }} value={address} required />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">State</label>
                        <select onChange={(e) => { setStateName(e.target.value) }} value={stateName}  required
                            className="cursor-pointer border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500">
                            <option className="cursor-pointer text-slate-800">Dhaka</option>
                            <option className="cursor-pointer text-slate-800">Chittagong</option>
                            <option className="cursor-pointer text-slate-800">Chittagong</option>
                            <option className="cursor-pointer text-slate-800">Khulna</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Department</label>
                        <select className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" onChange={(e) => { setDepartmentName(e.target.value) }} value={departmentName} defaultValue={"placeholder"} required >
                            <option value={"placeholder"} className="cursor-pointer text-slate-800">Please Select **</option>
                            {dept_list}
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Position</label>
                        <select className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="text" onChange={(e) => { setPositionName(e.target.value) }} value={positionName} defaultValue={"placeholder"} required >
                            <option value={"placeholder"} className="cursor-pointer text-slate-800">Please Select **</option>
                            {position_list}
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Hiring Date</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="date" onChange={(e) => { setHiringDate(e.target.value) }} value={hiringDate} required />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex flex-col w-full">
                        <label className="my-1">Termination Date</label>
                        <input
                            className="border border-2 border-slate-300 py-2 px-2.5 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                            type="date" onChange={(e) => { setTerminationDate(e.target.value) }} value={terminationDate} required />
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
                <div className="col-span-12 flex justify-end">
                    <button type='submit' className="mt-2 py-3 px-4 md:px-8 bg-slate-700 text-slate-50 shadow-md shadow-slate-500 hover:bg-purple-500 transition-all duration-300 ease-linear">Register Employee</button>
                </div>
            </form>

        </div>

    );
}
