
//Get all jobs
const getJobs = "SELECT * FROM job";

//Add job
const addJob = "INSERT INTO job (job_title, job_description, job_type, job_industry, job_location, job_rate, company_name, company_number, company_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

//Edit job
const editJob = "UPDATE job SET job_title = $1, job_description = $2, job_type = $3, job_industry = $4, job_location = $5, job_rate = $6, company_name = $7, company_number = $8, company_email = $9 WHERE job_id = $10";

//Delete job
const deleteJob = "DELETE FROM job WHERE job_id = $1";

//Check exist
const checkJobExist = "SELECT j.* FROM j.job WHERE j.job_id = $1";

//Filteration


module.exports = {
    getJobs,
    addJob,
    editJob,
    deleteJob,
    checkJobExist,
};