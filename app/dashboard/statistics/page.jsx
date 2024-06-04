"use client"
import { getAllTasksStatusAPI, getAttendanceChartDataAPI, getDepartmentChartAPI, getEmployeeMinFieldsAPI, getPositionChartAPI } from '@/lib/api';
import { dateFormat, defaultDateNow } from '@/lib/dateFormat';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Chart from 'chart.js/auto';
import { Bar, Line, Doughnut } from "react-chartjs-2";

export default function Charts() {

    // INPUT
    const [month, setMonth] = useState(`${defaultDateNow().split("-")[0]}-${defaultDateNow().split("-")[1]}`);
    const [employeeData, setEmployeeData] = useState({})
    const [attendanceChartData, setAttendanceChartData] = useState({});
    const [tasksChartData, setTasksChartData] = useState({});
    const [departmentChartData, setDepartmentChartData] = useState({})
    const [positionChartData, setPositionChartData] = useState({})

    useEffect(() => {
        fetchAttendanceChart(month);
        fetchEmployees();
        fetchTaskChart();
        fetchDepartmentChart();
        fetchPositionChart();
    }, [])

    async function fetchEmployees() {
        const response = await getEmployeeMinFieldsAPI();
        console.log("RES EMPLOYEE:: ", response);
        setEmployeeData(response);
    }

    async function fetchAttendanceChart(month) {
        const response = await getAttendanceChartDataAPI(month);
        console.log("RES Chart:: ", response);
        setAttendanceChartData(response);
    }

    async function fetchTaskChart() {
        const response = await getAllTasksStatusAPI();
        console.log("RES Chart:: ", response);
        setTasksChartData(response);
        // console.log("SPECIAL", response.data.filter((data) => { if(data.taskCompleted) return data }).length)
    }

    async function fetchDepartmentChart() {
        const response = await getDepartmentChartAPI();
        console.log("RES DEPT Chart:: ", response);
        setDepartmentChartData(response);
    }

    async function fetchPositionChart() {
        const response = await getPositionChartAPI();
        console.log("RES POS Chart:: ", response);
        setPositionChartData(response);
    }

    async function submitMonth(e) {
        e.preventDefault();
        setMonth(e.target.value);
        if (e.target.value.length !== 0) {
            fetchAttendanceChart(e.target.value);
        }
    }

    return (
        <div className='grid grid-cols-12 gap-5 md:p-2'>

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
                        <Line className='w-full'
                            data={{
                                labels: attendanceChartData.data.map(data => dateFormat(data.date)),
                                datasets: [
                                    {
                                        label: "Attendance",
                                        data: attendanceChartData.data.map(data => data.number),
                                        borderColor: "#14b8a6",
                                        lineTension: 0.15,
                                        backgroundColor: "#14b8a640",
                                        fill: true,
                                    }
                                ]
                            }}

                            width={"100%"}
                            options={{ maintainAspectRatio: false, scales: {y: { max: employeeData.data.length, min: 0 }} }}
                        />
                    </div>
                    :
                    <div className='h-[40vh] flex items-center justify-center'>
                        <div className='text-slate-800'>{attendanceChartData.status === 0 ? <h6>No recorded attendance</h6> : (attendanceChartData.status === 400 || attendanceChartData.status === 500) ? <h6>There was an error, status {attendanceChartData.status}</h6> : <div className="loader"></div>}</div>
                    </div>
                }
            </div>

            <div className='col-span-12 md:col-span-6 lg:col-span-4 rounded-lg flex flex-col items-center bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden p-3'>
                <div className='py-2'>
                    <h5 className='text-slate-800'>Task Completion</h5>
                </div>
                {tasksChartData.status === 200 ?
                    <div className='w-full h-[40vh] flex justify-center items-center p-2'>
                        <Doughnut
                            data={{
                                labels: ["Done", "Not Done"],
                                datasets: [
                                    {
                                        label: "Tasks",
                                        data: [tasksChartData.data.filter((data) => { if (data.taskCompleted) return data }).length, tasksChartData.data.filter((data) => { if (!data.taskCompleted) return data }).length],
                                        backgroundColor: ["#14b8a6", "#ec4899"]
                                    }
                                ]
                            }}
                        />
                    </div> :
                    <div className='w-full h-[40vh] flex items-center justify-center p-2'>
                        <div className='text-slate-800'>{tasksChartData.status === 0 ? <h6>No recorded tasks</h6> : (tasksChartData.status === 400 || tasksChartData.status === 500) ? <h6>There was an error, status {tasksChartData.status}</h6> : <div className="loader"></div>}</div>
                    </div>
                }
            </div>

            <div className='col-span-12 md:col-span-6 lg:col-span-8 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden p-3'>
                <div className='flex items-center justify-center py-2'>
                    <h5 className='text-slate-800'>Employee Category by Departments</h5>                    
                </div>
                {(departmentChartData.status === 200) ?
                    <div className='h-[40vh] p-2'>
                        <Bar className='w-full'
                            data={{
                                labels: departmentChartData.data.map(data => data.departmentName),
                                datasets: [
                                    {
                                        label: "Department",
                                        data: departmentChartData.data.map(data => data.number),
                                        backgroundColor: ["#14b8a6", "#a855f7", "#06b6d4", "#ec4899", "#6366f1"],
                                        borderColor: "#14b8a6",
                                    }
                                ]
                            }}

                            width={"100%"}
                            options={{ maintainAspectRatio: false, scales: {y: {ticks: {stepSize: 1,}}}}}
                        />
                    </div>
                    :
                    <div className='h-[40vh] flex items-center justify-center'>
                        <div className='text-slate-800'>{departmentChartData.status === 0 ? <h6>No recorded employee departments</h6> : (departmentChartData.status === 400 || departmentChartData.status === 500) ? <h6>There was an error, status {departmentChartData.status}</h6> : <div className="loader"></div>}</div>
                    </div>
                }
            </div>

            <div className='col-span-12 md:col-span-6 lg:col-span-8 rounded-lg bg-slate-50 box-shadow-1 text-slate-800 overflow-hidden p-3'>
                <div className='flex items-center justify-center py-2'>
                    <h5 className='text-slate-800'>Employee Category by Positions</h5>                    
                </div>
                {(positionChartData.status === 200) ?
                    <div className='h-[40vh] p-2'>
                        <Bar className='w-full'
                            data={{
                                labels: positionChartData.data.map(data => data.positionName),
                                datasets: [
                                    {
                                        label: "Position",
                                        data: positionChartData.data.map(data => data.number),
                                        backgroundColor: ["#14b8a6", "#a855f7", "#06b6d4", "#ec4899", "#6366f1"],
                                        borderColor: "#a855f7",
                                    }
                                ]
                            }}

                            width={"100%"}
                            options={{ maintainAspectRatio: false, scales: {y: {ticks: {stepSize: 1,}}}}}
                        />
                    </div>
                    :
                    <div className='h-[40vh] flex items-center justify-center'>
                        <div className='text-slate-800'>{positionChartData.status === 0 ? <h6>No recorded employee positions</h6> : (positionChartData.status === 400 || positionChartData.status === 500) ? <h6>There was an error, status {positionChartData.status}</h6> : <div className="loader"></div>}</div>
                    </div>
                }
            </div>

        </div>
    )
}
