'use client'
import { useSession } from 'next-auth/react';
import React from 'react'
import AdminDashboard from './adminDashboard';

export default function RoleAccess({ children }) {
    const { data: session } = useSession();
    if(session?.user){
        if(session?.user?.role === 'admin'){
            return (
                <AdminDashboard>
                    {children}
                </AdminDashboard>
            )
        }
        else{
            return(
                <div className='bg-slate-200 text-slate-700 min-h-screen flex justify-center items-center'>
                    <h2>You're not authorized to view this page</h2>
                </div>
            )
        }
    }    
}
