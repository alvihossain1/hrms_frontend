import axios from "axios"
let SERVER_URL = process.env.SERVER_URL

// HR
export async function hrmRegisterAPI(formData) {
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

export async function hrmLoginAPI(data) {
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


export async function getAllHrUsersAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/admin/hrUser`,
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

export async function getEmployeeMinFieldsAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/employee/minFields`,
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
        url: `${SERVER_URL}/user/attendance/notIn/${date}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getEmployeeByDateAttendedAPI(date) {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/attendance/in/${date}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function addAttendanceManulAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/attendance/manual`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getEmployeeMonthlyAttendanceAPI(data) {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/attendance/month/${data.month}/id/${data.employeeId}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

// TASKS
export async function addTaskAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/task`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getAssignedTasksAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/task`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function updateTaskAPI(data) {
    return await axios({
        method: 'put',
        url: `${SERVER_URL}/user/task`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function changeTaskStatusAPI(data) {
    return await axios({
        method: 'put',
        url: `${SERVER_URL}/user/task/complete`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function deleteAssignedTasksAPI(data) {
    return await axios({
        method: 'delete',
        url: `${SERVER_URL}/user/task`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


// LEAVE
export async function assignLeaveAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/user/leave`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function getAssignedLeaveAppAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/leave`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function updateLeaveAppAPI(data) {
    return await axios({
        method: 'put',
        url: `${SERVER_URL}/user/leave`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function deleteLeaveAppAPI(data) {
    return await axios({
        method: 'delete',
        url: `${SERVER_URL}/user/leave`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

// CHARTS
// Attendance
export async function getAttendanceChartDataAPI(month) {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/attendance/charts/${month}`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}
// Tasks
export async function getAllTasksStatusAPI() {
    return await axios({
        method: 'get',
        url: `${SERVER_URL}/user/task/charts`,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}


// ADMIN ALL
export async function adminLoginAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/admin/login`,
        data: data,
    }).then((response) => {
        return response.data
    })
        .catch((error) => {
            return { status: 400, error }
        })
}

export async function adminHRUpdateFieldsAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/admin/hrUser/updateFields`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function adminHRUpdatePasswordAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/admin/hrUser/updatePassword`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}

export async function adminHRUpdateModuleAPI(data) {
    return await axios({
        method: 'post',
        url: `${SERVER_URL}/admin/hrUser/updateModule`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((error) => {
        return { status: 400, error }
    })
}