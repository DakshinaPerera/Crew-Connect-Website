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
        full_name,
        work_email_address,
        phone_number,
        company_name,
        job_industry,
        job_type,
        job_location,
        salary,
        job_description
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

        // Email options with updated format
        const mailOptions = {
            from: 'danuja.kowaski@gmail.com',
            to: 'danuja.2018221@iit.ac.lk',
            subject: `New Job Added: ${company_name} - ${job_industry}`,
            text: 
`A new job has been added!

Job Details:
------------
Full Name: ${full_name}
Work Email Address: ${work_email_address}
Phone Number: ${phone_number}
Company Name: ${company_name}
Job Industry: ${job_industry}
Job Type: ${job_type}
Job Location: ${job_location}
Salary: ${salary}

Job Description:
----------------
${job_description}

Best regards,
Job Management System`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            message: "Your Job has been successfully posted!"
        });
    } catch (error) {
        console.error(error);
        // Return JSON error response
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the job.",
            error: error.message
        });
    }
};



module.exports = {
    getJobs,
    addJob,
};
