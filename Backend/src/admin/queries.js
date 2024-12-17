
//Check user exist
const checkUserQuery = `
  SELECT * 
  FROM admin 
  WHERE admin_username = $1 AND admin_password = $2;
`;

//Get all jobs
const getJobs = "SELECT * FROM job";

//Get job based on id
const getJobById = "SELECT * FROM job WHERE job_id = $1"
//Add job
const addJob = "INSERT INTO job (job_title, job_description, job_type, job_industry, job_location, job_rate, company_name, company_number, company_email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

//Edit job
const editJob = "UPDATE job SET job_title = $1, job_description = $2, job_type = $3, job_industry = $4, job_location = $5, job_rate = $6, company_name = $7, company_number = $8, company_email = $9 WHERE job_id = $10";

//Delete job
const deleteJob = "DELETE FROM job WHERE job_id = $1";

//Check exist
const checkJobExist = "SELECT * FROM job WHERE job_id = $1";

//Dropdown values
const getJobTypes = "SELECT job_type from job";

//Dropdown values
const getJobIndustries = "SELECT job_industry from job";

//Filteration
const searchFilter = `SELECT * from job WHERE job_title ILIKE $1 OR job_description ILIKE $2 AND job_type = $3 AND job_industry = $4`;

//Change status
const setStatus = 'UPDATE job set job_status = $1 WHERE job_id = $2';

module.exports = {
    checkUserQuery,
    getJobs,
    getJobById,
    addJob,
    editJob,
    deleteJob,
    checkJobExist,
    getJobTypes,
    getJobIndustries,
    searchFilter,
    setStatus
};