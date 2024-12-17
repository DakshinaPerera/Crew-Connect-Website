
const getAvailableJobs = "SELECT * FROM job WHERE job_status = 'active'  ";

module.exports = {
    getAvailableJobs,
};