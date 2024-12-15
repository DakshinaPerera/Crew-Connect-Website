// Import necessary modules
const pool = require('../../db'); 
const queries = require('./queries'); 

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

        res.status(201).send("Added Job successfully and sent email notification!");
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
        res.status(200).send("Successfully edited job!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while editing the job.");
    }
};
//Change status of job from active -> inactive

module.exports = {
    getJobs,
    addJob,
    deleteJob,
    editJob
};
