const nodemailer = require('nodemailer');

const mailSender = async (email, titel, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from:"Pathsala || By Priyanshu",
            to: email,
            subject: `OTP from Pathsala ${titel}`,
            text: `Your OTP is ${body}`,
        };
        console.log(info);
        await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.log(err);
    }   
}

module.exports = mailSender;
