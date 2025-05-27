const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Task Manager" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error in sending mails:', error);
        return res.status(500).json({message: 'Error in mail sending'})
    }
}

module.exports = sendEmail;