const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendConfirmationEmail = (societyName, userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "🎉 Your Account Has Been Approved!",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #4CAF50;">Welcome to ${societyName}!</h2>
                    <p>Hi there,</p>
                    <p>We're excited to let you know that your account request has been <strong style="color: #4CAF50;">approved</strong> by the admin of <strong>${societyName}</strong>.</p>
                    <p>You can now log in and access all society updates, notices, and events.</p>
                    <a href="https://your-society-website.com/login" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Login Now</a>
                    <p style="margin-top: 30px; font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
                    <p style="font-size: 12px; color: #aaa;">&copy; ${new Date().getFullYear()} ${societyName} Community</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
};

module.exports = {sendConfirmationEmail};