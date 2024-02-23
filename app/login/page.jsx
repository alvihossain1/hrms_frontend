"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import CustomToast from '@/components/CustomToast';
import { useRouter } from 'next/navigation';



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            if (res.error) {
                toast.error("Username or password is incorrect");
            }
            else {
                router.replace("/dashboard");
            }
        }
        catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="min-h-screen flex justify-center items-center background-theme-login">
            <CustomToast />
            <div className="w-full mx-2 md:w-10/12 lg:w-8/12 xl:w-3/12 p-2 md:p-0 bg-slate-800 rounded-xl overflow-hidden">
                <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-12 p-2 md:p-5">
                    <div className="col-span-12">
                        <div className="mt-3 mb-5 flex flex-col gap-2">
                            <h2 className="text-center text-slate-200"><span className="text-purple-500">HRM</span> System</h2>
                            <h3 className="text-center text-slate-200">Login Panel</h3>
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
                        <div className="flex gap-1.5 my-4">
                            <p className="text-slate-200 text-sm">Don&apos;t have an account? <Link className="text-purple-500 underline" href="/signup">Click Here</Link></p>
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
