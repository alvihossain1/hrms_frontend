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
export const EmployeePDF = ({ emp }) => (
  <Document>
    <Page size="A4">
      <View style={tw("h-full flex flex-column p-12 bg-white")}>
        <View style={tw("w-full py-2 px-3 bg-slate-700 text-white flex flex-row items-center gap-2.5")}>
          <Image style={tw("w-[50px] h-[50px] rounded-md")} src={process.env.ORG_IMAGE} alt="logo" />
          <Text style={tw("my-auto font-bold text-sm")}>{process.env.ORG_NAME}</Text>
          <Text style={tw("ml-auto my-auto font-bold text-sm")}>HRM System</Text>
        </View>
        <View style={tw("w-[250px] h-[250px] overflow-hidden rounded-sm my-3")}>
          <Image style={tw("w-full h-full object-cover object-center")} src={emp.image_url} alt="employee-profile" />
        </View>
        <View style={tw("p-3 flex flex-col gap-1 border-2 border-slate-200 text-sm mb-2")}>
          <Text style={tw("font-bold text-xl")}>Employee Details</Text>
          <Text>Name: {emp.fname} {emp.lname}</Text>
          <Text>Email: {emp.email}</Text>
          <Text>Contact Number: {emp.contactNo}</Text>
          <Text>Address: {emp.address}</Text>
          <Text>State: {emp.stateName}</Text>
          <Text>gender: {emp.gender}</Text>
          <Text>Date of Birth: {dateFormat(emp.dob)}</Text>
          <Text>Employee Status: {emp.employeeStatus}</Text>
          <Text>Department Name: {emp.departmentName}</Text>
          <Text>Position Name: {emp.positionName}</Text>
          <Text>Hiring Date: {dateFormat(emp.hiringDate)}</Text>
          <Text>Termination Date: {dateFormat(emp.terminationDate)}</Text>
          <Text>Data Created: {dateFormat(emp.createdAt)}</Text>
        </View>
        {emp.salary_tbl ? <View style={tw("p-3 flex flex-col gap-1 border-2 border-slate-200 text-sm")}>
          <Text style={tw("font-bold text-xl")}>Salary Details</Text>
          <Text>Base Salary: {emp.salary_tbl.baseSalary}</Text>
          <Text>Bonus: {emp.salary_tbl.bonus}</Text>
          <Text>Allowance: {emp.salary_tbl.allowance}</Text>
          <Text>Benefits: {emp.salary_tbl.benefits}</Text>
          <Text>Total: {emp.salary_tbl.total}</Text>
        </View>
          :
          <View style={tw("p-3 border-2 border-slate-200 text-sm")}>
            <Text style={tw("font-bold text-xl m-0 p-0")}>No salary info </Text>
          </View>
        }
      </View>
    </Page>
  </Document>
);