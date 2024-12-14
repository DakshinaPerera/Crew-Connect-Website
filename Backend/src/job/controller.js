const { response } = require('express');
const pool = require('../../db');
const queries = require('./queries');

const getJobs = (req, res) => {
    pool.query(queries.getJobs, (error, results) => {
        if (error) throw error;
        res.status(200).json(
            results.rows
        );
    });
};

const addJob = (req, res) => {
    const { job_title, job_description, job_type, job_industry, 
            job_location, job_rate, company_name, company_number  } = req.body;
            //Add logic to check if the job already exists

            pool.query(queries.addJob, [ job_title, job_description, job_type, job_industry, 
                job_location, job_rate, company_name, company_number ], (error, results) => {
                if (error) console.log(error);
                res.status(201).send("Added Job successfully!");
            });
};

// Delete job
const deleteJob = (req, res) => {
    const id = parseInt(req.params.id);

    //Check row id query needs to be implemented.

    pool.query(queries.checkJobExist, [id], (error, results) => {
        // Check logic for this
        // const noJobFound = !results.rows.length;
        // if (noJobFound){
        //     res.send("Job does not exist in the database!");
        // }

        pool.query(queries.deleteJob, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Job deleted successfully");
        });
});
};

const editJob = (req, res) => {
    const id = parseInt(req.params.id);

    const { job_title, job_description, job_type, job_industry, 
        job_location, job_rate, company_name, company_number } = req.body;

        //Add logic to check if job does not exist


        pool.query(queries.editJob, [job_title, job_description, job_type, job_industry, 
            job_location, job_rate, company_name, company_number, id] ,(error, results) => {
                if (error) throw error;
                res.status(200).send("Successfully edited job!");
            });
};



module.exports = {
    getJobs,
    addJob,
    deleteJob,
    editJob
};