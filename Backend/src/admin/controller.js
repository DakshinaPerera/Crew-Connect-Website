// Import necessary modules
const pool = require('../../db'); 
const queries = require('./queries'); 


//Auth
const adminLogin = async (req, res) => {
    const { admin_username, admin_password } = req.body; 
  
    if (!admin_username || !admin_password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
  
      const result = await pool.query(queries.checkUserQuery, [admin_username, admin_password]);
  
      if (result.rows.length > 0) {
        return res.status(200).json({ message: 'Login successful', user: result.rows[0] });
      } else {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };
  
const getJobs = async (req, res) => {
    try {
        const results = await pool.query(queries.getJobs);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching jobs.");
    }
};

const addJob = async (req, res) => {
    const { 
        job_title, 
        job_description, 
        job_type, 
        job_industry, 
        job_location, 
        job_rate, 
        company_name, 
        company_number,
        company_email,  
    } = req.body;

    try {
        // Add logic to check if the job already exists

        // Insert the job into the database
        await pool.query(queries.addJob, [
            job_title, 
            job_description, 
            job_type, 
            job_industry, 
            job_location, 
            job_rate, 
            company_name, 
            company_number,
            company_email
        ]);

        res.status(201).send("Added Job successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the job.");
    }
};

const deleteJob = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Check if the job exists
        const results = await pool.query(queries.checkJobExist, [id]);
        if (!results.rows.length) {
            return res.status(404).send("Job does not exist in the database!");
        }

        // Delete the job
        await pool.query(queries.deleteJob, [id]);
        res.status(200).send("Job deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the job.");
    }
};

const editJob = async (req, res) => {
    const id = parseInt(req.params.id);
    const { 
        job_title, 
        job_description, 
        job_type, 
        job_industry, 
        job_location, 
        job_rate, 
        company_name, 
        company_number,
        company_email
    } = req.body;

    try {
        // Check if the job exists
        const results = await pool.query(queries.checkJobExist, [id]);
        if (!results.rows.length) {
            return res.status(404).send("Job does not exist in the database!");
        }

        // Update the job details
        await pool.query(queries.editJob, [
            job_title, 
            job_description, 
            job_type, 
            job_industry, 
            job_location, 
            job_rate, 
            company_name, 
            company_number,
            company_email, 
            id
        ]);

        const editedData = await pool.query(queries.getJobById, [id]);
        res.status(200).json(editedData.rows);
      
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while editing the job.");
    }
};
const searchJobs = async (req, res) => {
    try {
      const { job_title, job_description, job_type, job_industry} = req.query;
      
      const jobs = await pool.query(queries.searchFilter, [`%${job_title}%`, `%${job_description}%`, job_type, job_industry]);
      console.log(job_title, job_description);
      res.json(jobs.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error searching jobs' });
    }
  };

  //Change status of job from active -> inactive
  const setJobStatus = async (req, res) => {
    try {
        const { job_status } = req.query;
        const id = parseInt(req.params.id);
        await pool.query(queries.setStatus, [job_status, id]);
        res.status(200).send("Successfully switched status!");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error switching status' });
    }
  };

module.exports = {
    adminLogin,
    getJobs,
    addJob,
    deleteJob,
    editJob,
    searchJobs,
    setJobStatus
};
