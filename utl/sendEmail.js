const nodemailer = require("nodemailer");
const {senderemail,emailPassword}=require("../config/keys");

const sendEmail = async ({ emailTo, subject, code, content }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        auth: {
            user: senderemail, // Replace with your email
            pass: emailPassword // Use an App Password (not your Gmail password)
        }
    });

    const message = { // Fixed: Added '=' and proper object syntax
        to: emailTo,
        subject,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd;">
                <h2 style="color: #444;">${subject}</h2>
                <p>${content}</p>
                <p style="font-size: 24px; font-weight: bold; color: #0066cc;">Verification Code: ${code}</p>
                <p style="font-size: 12px; color: #777;">This email was sent automatically. Do not reply.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(message); // Send the email
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail; // Fixed: Changed `module.export` to `module.exports`