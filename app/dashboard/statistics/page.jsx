"use client"
import { getAttendanceChartData, getEmployeeMinFieldsAPI } from '@/lib/api';
import { dateFormat } from '@/lib/dateFormat';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export default function Charts() {

    // INPUT
    const [month, setMonth] = useState(process());
    const [employeeData, setEmployeeData] = useState({})
    const [attendanceChartData, setAttendanceChartData] = useState({});

    useEffect(() => {
        fetchAttendanceChart(month);
        fetchEmployees();
    }, [])

    function process() {
        const d = new Date();
        let month = d.getMonth()
        month = parseInt(month) + 1
        if (month < 10) {
            month = "0" + month;
            console.log("Month::  ", month);
        }

        return d.getFullYear() + "-" + month;

    }

    async function fetchEmployees() {
        const response = await getEmployeeMinFieldsAPI();
        console.log("RES EMPLOYEE:: ", response);
        setEmployeeData(response);
    }

    async function fetchAttendanceChart(month) {
        const response = await getAttendanceChartData(month);
        console.log("RES Chart:: ", response);
        setAttendanceChartData(response);
    }

    async function submitMonth(e) {
        e.preventDefault();
        setMonth(e.target.value);
        if (e.target.value.length !== 0) {
            fetchAttendanceChart(e.target.value);
        }
    }

    return (
        <div className='grid grid-cols-12 gap-4 md:p-2'>
            <div className='col-span-12 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden p-3'>
                <div className='flex items-center justify-between py-2'>
                    <h5 className='text-slate-800'>Employee Monthly Attendance</h5>
                    <div className='flex flex-wrap gap-2'>
                        <p className='text-sm font-bold my-auto'>Change Month:</p>
                        <input type='month' className='py-1 px-2 text-sm border border-2 border-slate-300 text-slate-800 caret-purple-500 focus:outline-none focus:border-purple-500' onChange={(e) => submitMonth(e)} value={month} />
                    </div>
                </div>
                {(attendanceChartData.status === 200 && employeeData.status === 200) ?
                    <div className='h-[40vh] p-2'>
                        <Bar className='w-full'
                            data={{
                                labels: attendanceChartData.data.map(data => dateFormat(data.date)),
                                datasets: [
                                    {
                                        label: "Attendance",
                                        data: attendanceChartData.data.map(data => data.number),
                                        backgroundColor: ["#14b8a6", "#a855f7", "#06b6d4", "#ec4899", "#6366f1"]
                                    }
                                ]
                            }}

                            width={"100%"}
                            options={{ maintainAspectRatio: false, scales: { y: { max: employeeData.data.length } } }}
                        />
                    </div>
                    :
                    <div className='h-[40vh] flex items-center justify-center'>
                        <div className='text-slate-800'>{attendanceChartData.status === 0 ? <h6>No recorded attendance</h6> : <div className="loader"></div>}</div>
                    </div>
                }
            </div>
        </div>
    )
}
