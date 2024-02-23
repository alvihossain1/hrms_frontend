"use client"
import CustomToast from '@/components/CustomToast';
import { hrmRegister } from '@/lib/api';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [terms, setTerms] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!terms) {
            toast.info("Please check in to the terms and conditions.");
            return;
        }
        else if (!profileImage) {
            toast.info("User must upload profile picture.");
            return;
        }
        else {
            const formData = new FormData();
            const user = { fname, lname, email, password };
            formData.append("user", JSON.stringify(user));
            formData.append("image", profileImage);

            let response = await hrmRegister(formData);
            if (response.status === 200) {
                toast.success(`${response.data}, Redirecting to login page in 5s`);
                e.target.reset()
                const time = setTimeout(() => {                    
                    router.replace("/login")
                    clearTimeout(time)
                }, 5000)
            }
            else if(response.status === 500){
                toast.error(response.data);
            }
        }

    }

    return (
        <div className="min-h-screen flex justify-center items-center background-theme-signup">
            <CustomToast />
            <div className="w-full mx-2 md:w-10/12 lg:w-8/12 xl:w-3/12 p-2 md:p-0 bg-slate-800 rounded-xl overflow-hidden">
                <form onSubmit={(e) => { handleSubmit(e) }} className="grid grid-cols-12 p-2 md:p-5">
                    <div className="col-span-12">
                        <div className="mt-3 mb-5 flex flex-col gap-2">
                            <h2 className="text-center text-slate-200"><span className="text-purple-500">HRM</span> System</h2>
                            <h3 className="text-center text-slate-200">SignUp Panel</h3>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1.5 my-4 mr-1.5">
                            <label className="text-slate-200" htmlFor="fname">First Name <span className='text-pink-600 text-xs'>*</span></label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="fname" type="text" onChange={(e) => { setFname(e.target.value) }} required />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1.5 my-4 ml-1.5">
                            <label className="text-slate-200" htmlFor="lname">Last Name <span className='text-pink-600 text-xs'>*</span></label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="lname" type="text" onChange={(e) => { setLname(e.target.value) }} required />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-slate-200" htmlFor="email">Email <span className='text-pink-600 text-xs'>*</span></label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-slate-200" htmlFor="password">Password <span className='text-pink-600 text-xs'>*</span></label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} required />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-slate-200" htmlFor="password">Profile Image <span className='text-pink-600 text-xs'>*</span></label>
                            <input id="profileImage" className="hidden" type="file" accept='image/*' onChange={(e) => setProfileImage(e.target.files[0])} />
                            <div className='flex gap-2 border-2 border-slate-500'>
                                <label className="py-2.5 px-2 border-r-2 border-slate-500 bg-white text-slate-800 hover:bg-purple-500 hover:text-slate-200 transition-all duration-300 ease flex items-center justify-center gap-1 text-md cursor-pointer" htmlFor="profileImage">Upload Image <FontAwesomeIcon icon={faCloudArrowUp}></FontAwesomeIcon></label>
                                <div className='overflow-hidden flex items-center'>
                                    <p className='text-slate-200 text-sm break-none'>{profileImage === "" ? "Choose an Image" : profileImage.name.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex gap-1.5 my-4">
                            <input className="w-4 cursor-pointer" id='checkbox' type="checkbox" onChange={(e) => { setTerms(e.target.checked) }} />
                            <label htmlFor="checkbox" className="text-slate-200 cursor-pointer">I agree with the SignUp terms and conditions <span className='text-pink-600 text-xs'>*</span></label>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex gap-1.5 my-2">
                            <p className="text-slate-200 text-sm">Go back to login page <Link className="text-purple-500 underline" href="/login">Click Here</Link></p>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 mb-2.5 my-4">
                            <button type='submit'
                                className="py-2.5 mx-0.5 bg-purple-500 text-slate-200 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-linear">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
