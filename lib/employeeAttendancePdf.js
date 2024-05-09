import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import { dateFormat } from './dateFormat';
import Logo from '@/public/images/hrms.png'

// The 'theme' object is your Tailwind theme config
const tw = createTw({
    theme: {
        // fontFamily: {
        //   sans: ["Comic Sans"],
        // },
        extend: {
            colors: {
                custom: "white",
            },
        },
    },
});

// Create Document Component
export const EmployeeAttendancePDF = ({ emp, attendanceData }) => (
    <Document>
        <Page size="A4">
            <View style={tw("h-full flex flex-col p-12 bg-white")}>
                <View style={tw("w-full py-2 px-3 bg-slate-700 text-white flex flex-row items-center gap-2.5")}>
                    <Image style={tw("w-[50px] h-[50px] rounded-md")} src={process.env.ORG_IMAGE} alt="logo" />
                    <Text style={tw("my-auto font-bold text-sm")}>{process.env.ORG_NAME}</Text>
                    <Text style={tw("ml-auto my-auto font-bold text-sm")}>HRM System</Text>
                </View>
                {/* Header Ends */}
                <View style={tw("flex flex-row justify-between items-center")}>
                    <View style={tw("flex flex-col gap-1")}>
                        <Text style={tw("font-bold text-lg")}>Employee Details</Text>
                        <Text style={tw("text-sm")}>Name: {emp.fname} {emp.lname}</Text>
                        <Text style={tw("text-sm")}>Email: {emp.email}</Text>
                        <Text style={tw("text-sm")}>Contact No: {emp.contactNo}</Text>
                    </View>
                    <View style={tw("w-[80px] h-[80px] overflow-hidden my-2 border border-slate-300")}>
                        <Image style={tw("w-full h-full object-cover object-center")} src={emp.image_url} alt="employee-profile" />
                    </View>
                </View>
                <View style={tw("flex flex-col text-sm mt-1")}>
                    <Text style={tw("text-xs mb-1")}>Attendance of - {dateFormat(attendanceData.data.records[0].date).split(" ")[1]} {dateFormat(attendanceData.data.records[0].date).split(" ")[2]}</Text>
                    <Text style={tw("text-xs mb-1")}>Present Days: {attendanceData.data.noOfDaysPresent} | Absent Days: {attendanceData.data.noOfDaysAbsent} | Off Days: {attendanceData.data.noOfDaysOff}</Text>
                    <View style={tw("w-full text-center")}>
                        <View style={tw("flex flex-row w-full border-y border-slate-300 p-1.5")}>
                            <Text style={tw("text-xs w-full font-bold")}>Date</Text>
                            <Text style={tw("text-xs w-full font-bold")}>Day</Text>
                            <Text style={tw("text-xs w-full font-bold")}>Clock In Time</Text>
                            <Text style={tw("text-xs w-full font-bold")}>Clock Out Time</Text>
                            <Text style={tw("text-xs w-full font-bold")}>Hours worked</Text>
                            <Text style={tw("text-xs w-full font-bold")}>Present</Text>
                        </View>
                    </View>
                    {attendanceData.data.records.map((data) => (((
                        <View key={data.attendanceId} style={tw("w-full text-center")}>
                            <View style={tw("flex flex-row w-full border-b border-slate-300 p-1.5")}>
                                <Text style={tw("text-xs w-full")}>{dateFormat(data.date)}</Text>
                                <Text style={tw("text-xs w-full")}>{data.day}</Text>
                                <Text style={tw("text-xs w-full")}>{data.clockInTime}</Text>
                                <Text style={tw("text-xs w-full")}>{data.clockOutTime}</Text>
                                <Text style={tw("text-xs w-full")}>{data.hoursWorked}</Text>
                                <Text style={tw(`text-xs w-full ${data.present === 'A' ? 'text-red-600' : data.present === 'P' ? 'text-green-600' : 'text-slate-800'}`)}>{data.present}</Text>
                            </View>
                        </View>
                    ))))}
                </View>

            </View>
        </Page>
    </Document>
);