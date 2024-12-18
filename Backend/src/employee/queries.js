
const getAvailableJobs = "SELECT * FROM job WHERE job_status = 'active'  ";

const checkEmployeeExist = "SELECT * FROM employee where employee_email = $1";


module.exports = {
    getAvailableJobs,
    checkEmployeeExist
};