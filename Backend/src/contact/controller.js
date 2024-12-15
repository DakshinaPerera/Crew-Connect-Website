// Import necessary modules
const nodemailer = require('nodemailer');



const sendContactUsEmail = async (req, res) => {
    const { 
        cn_name, 
        cn_email, 
        cn_subject, 
        cn_message,  
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
            subject: 'New Contact Added',
            text: `A new contact has been added: \n\nContact name: ${cn_name}\nEmail Address: ${cn_email}\nSubject: ${cn_subject} \nMessage: ${cn_message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).send("Added Contact and sent email notification!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the job.");
    }
};



module.exports = {
    sendContactUsEmail,

};
