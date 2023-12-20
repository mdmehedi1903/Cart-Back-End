const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.adbiyastravel.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@adbiyastravel.com",
            pass: 'MAVg6Br?i_$n'
        },tls: {
            rejectUnauthorized: false
        },
    }); 


    let mailOptions = {
        from: 'MERN ECOMMERCE Site <info@adbiyastravel.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility