import axios from "axios"
let SERVER_URL = process.env.SERVER_URL

export async function hrmRegister(formData) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/hrmUserRegister`,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function hrmLogin(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/hrmUserLogin`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

// DEPARTMENT
export async function addDepartmentAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/department`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getDepartmentsAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/department`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


export async function deleteDepartmentAPI(id) {
    return await axios({
        method: 'delete',
        url: `${SERVER_URL}/user/department/${id}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


// POSITIONS
export async function addPositionAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/position`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getPositionsAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/position`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


export async function deletePositionAPI(id) {
    return await axios({
        method: 'delete',
        url: `${SERVER_URL}/user/position/${id}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


//   EMPLOYEE
export async function addEmployeeAPI(formData) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/employee`,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function getEmployeeAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/employee`,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function updateEmployeeAPI(data) {
    return await axios({
        method: 'put',
        url: `${SERVER_URL}/user/employee`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function removeEmployeeAPI(data) {
    return await axios({
        method: 'delete',
        url: `${SERVER_URL}/user/employee`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

// SALARY
export async function addSalaryAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/salary`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function updateSalaryAPI(data) {
    return await axios({
        method: 'put',
        url: `${SERVER_URL}/user/salary`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

// ATTENDANCE
export async function addAttendanceAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/attendance`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function getEmployeeByDateAttendanceAPI(date) {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/employeeAttendance/${date}`,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}