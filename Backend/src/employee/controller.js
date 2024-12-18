const pool = require('../../db'); 
const queries = require('./queries');

const getEmpAvailableJobs = async (req, res) => {
    try {
        const results = await pool.query(queries.getAvailableJobs);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching jobs.");
    }
};

//Upload employee details
const uploadEmpDetails = async (req, res) => {
    try { 
        
        const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'danuja.kowaski@gmail.com', //change to company email
                        pass: 'hvxq htpa uhwc vpnk' //change to company email password from app
                    }
                });

        const { firstName, lastName, email, mobileNumber, address, residentialStatus, preferredJobIndustry, preferredJobs } = req.body;
    

        let passportAndVisaFile;
        let resumeFile;
    
        if (residentialStatus === 'Non-Resident') {
          if (!req.files || !req.files.passportAndVisa || !req.files.resume) {
            return res.status(400).json({ error: 'Passport, VISA, and resume files are required for non-resident applicants.' });
          }
    
          passportAndVisaFile = req.files.passportAndVisa;
          resumeFile = req.files.resume;
    
          if (passportAndVisaFile.size > 2 * 1024 * 1024 || resumeFile.size > 2 * 1024 * 1024) {
            return res.status(400).json({ error: 'Passport, VISA, and resume file sizes must not exceed 2MB.' });
          }
        } else {
          if (req.files && req.files.resume) {
            resumeFile = req.files.resume;
            if (resumeFile.size > 2 * 1024 * 1024) {
              return res.status(400).json({ error: 'Resume file size must not exceed 2MB.' });
            }
          } else {
            return res.status(400).json({ error: 'Resume file is required.' });
          }
        }
    
        if (!firstName || !lastName || !email || !mobileNumber || !address || !residentialStatus || !preferredJobIndustry || !preferredJobs) {
          return res.status(400).json({ error: 'Please fill in all required fields.' });
        }
    
        const mailOptions = {
          from: 'danuja.kowaski@gmail.com',
          to: 'danuja.2018221@iit.ac.lk',
          subject: 'New Registration for CrewConnect',
          text: `
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Mobile Number: ${mobileNumber}
            Address: ${address}
            Residential Status: ${residentialStatus}
            Preferred Job Industry: ${preferredJobIndustry}
            Preferred Jobs: ${preferredJobs}
          `,
          attachments: []
        };
    
        if (passportAndVisaFile) {
          mailOptions.attachments.push({
            filename: passportAndVisaFile.name,
            content: fs.createReadStream(passportAndVisaFile.tempFilePath)
          });
        }
    
        if (resumeFile) {
          mailOptions.attachments.push({
            filename: resumeFile.name,
            content: fs.createReadStream(resumeFile.tempFilePath)
          });
        }
    
        await transporter.sendMail(mailOptions);
    
        if (passportAndVisaFile) {
          fs.unlinkSync(passportAndVisaFile.tempFilePath);
        }
        if (resumeFile) {
          fs.unlinkSync(resumeFile.tempFilePath);
        }
    
        res.status(200).json({ message: 'Registration successful!' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while processing your registration.' });
      }
};

const registerEmployee = async (req, res) => {
  try {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'danuja.kowaski@gmail.com', 
              pass: 'hvxq htpa uhwc vpnk'
          }
      });

      const { employee_fname, employee_lname, employee_email } = req.body;

      // Check if user already exists
      
      const existingUserResult = await pool.query(queries.checkEmployeeExist, [employee_email]);

      if (existingUserResult.rows.length > 0) {
          return res.status(400).json({ error: 'User already exists' });
      }

      // Generate OTP
      const otp = randomstring.generate({
          length: 6,
          charset: 'numeric'
      });

      // Store OTP with expiration
      // otpStorage.set(employee_email, {
      //     otp,
      //     createdAt: Date.now()
      // });

      // Send OTP via email
      await transporter.sendMail({
        from: "danuja.kowaski@gmail.com",
        to: employee_email,
        subject: 'Your Registration OTP for CREWCONNECT',
        text: `Hi ${employee_fname} ${employee_lname},
    
    Your OTP for registration is: ${otp}. 
    This OTP will expire in 10 minutes.
    
    Best regards,
    CREWCONNECT Team`
    });

      res.status(200).json({ 
          message: 'OTP sent successfully', 
          email: employee_email 
      });

      
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "An error occurred while adding the job.",
          error: error
      });
  }

};

module.exports = {
    getEmpAvailableJobs,
    uploadEmpDetails,
    registerEmployee
};