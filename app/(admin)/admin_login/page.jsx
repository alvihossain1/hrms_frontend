"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import CustomToast from '@/components/CustomToast';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';



export default function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [waitingLoader, setWaitingLoader] = useState(false);

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            toast.info("Please enter email and password");
            return;
        }

        try {
            setWaitingLoader(true);
            const res = await signIn("credentials", {
                email: email,
                password: password,
                userType: "admin",
                redirect: false,
            });
            if (res?.status == 200) {
                router.replace("/admin_dashboard");
                setWaitingLoader(false);
            }
            else{
                toast.error(res?.error);
                setWaitingLoader(false);
            }
        }
        catch (error) {
            console.log(error);
            setWaitingLoader(false);
        }

    }


    return (
        <div className="min-h-screen flex justify-center items-center background-theme-adminLogin">
            <CustomToast />
            {waitingLoader && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className='bg-slate-800 px-10 py-2 rounded-b-xl'>
                        <div className='loader'></div>
                    </div>
                </div>
            )}
            <div className="w-full mx-2 md:w-10/12 lg:w-8/12 xl:w-3/12 p-2 md:p-0 bg-slate-800 rounded-xl overflow-hidden">
                <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-12 p-2 md:p-5">
                    <div className="col-span-12">
                        <div className="mt-3 mb-5 flex flex-col gap-2">
                            <h2 className="text-center text-slate-200"><span className="text-purple-500">HRM</span> System</h2>
                            <h3 className="text-center text-slate-200"><span className='text-yellow-500'>Admin</span> Panel</h3>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-slate-200" htmlFor="email">Email</label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 my-4">
                            <label className="text-slate-200" htmlFor="password">Password</label>
                            <input
                                className="border border-2 rounded-sm border-slate-500 py-1.5 px-2 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500"
                                id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex text-yellow-500 gap-1.5 my-4">
                            <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>
                            <p className="text-sm font-bold">Admin login panel</p>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col gap-1.5 mb-2.5 my-4">
                            <button type='submit'
                                className="py-2.5 mx-0.5 bg-purple-500 text-slate-200 hover:bg-slate-200 hover:text-slate-800 transition-all duration-300 ease-linear">Login</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
