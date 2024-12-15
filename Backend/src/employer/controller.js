// Import necessary modules
const nodemailer = require('nodemailer');
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
        company_number  
    } = req.body;

    try {

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'danuja.kowaski@gmail.com', 
                pass: 'hvxq htpa uhwc vpnk'
            }
        });

        // Email options
        const mailOptions = {
            from: 'danuja.kowaski@gmail.com',
            to: 'danuja.2018221@iit.ac.lk',
            subject: 'New Job Added',
            text: `A new job has been added: \n\nJob Title: ${job_title}\nCompany: ${company_name}\nLocation: ${job_location}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).send("Added Job successfully and sent email notification!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the job.");
    }
};


module.exports = {
    getJobs,
    addJob,
};
