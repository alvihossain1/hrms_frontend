'use client'
import Dashboard from '@/components/Dashboard/Dashboard';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function RoleAccess({ children }) {
    const { data: session } = useSession();
    if(session?.user){
        if(session?.user?.role === 'hr'){
            return (
                <Dashboard>
                    {children}
                </Dashboard>
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
