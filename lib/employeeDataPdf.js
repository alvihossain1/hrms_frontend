import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import { dateFormat } from './dateFormat';

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
          <Image style={tw("w-[50px] h-[50px] rounded-md")} src={process.env.ORG_IMAGE} alt="company_logo" />
          <View>
            <Text style={tw("my-auto mb-1 font-bold text-[11px]")}>{process.env.ORG_NAME}</Text>
            <Text style={tw("my-auto font-bold text-[8px]")}>{process.env.ORG_ADDRESS}</Text>
          </View>
          <Image style={tw("w-[50px] h-[50px] ml-auto my-auto rounded-md")} src="/images/hrms.png" alt="system_logo" />
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