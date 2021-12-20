const nodemailer = require('nodemailer')
require('dotenv').config()

let options = {}
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendConfirmationEmail = async (receiverEmail) => {
    await transporter.sendMail({
        from: "CUFE-Classroom Support",
        to: receiverEmail,
        subject: options.subject,
        text: "",
        html: options.html
    })
}

exports.setEmailOptions = (user)=>{
    options.subject = "Please confirm your Email"
    options.html = `<h1>Email Confirmation</h1>
    <h2>Welcome ${user.firstName} ${user.lastName}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href=http://${process.env.HOST}:${process.env.PORT}${process.env.API_BASE_URL}/v${process.env.API_VERSION}/auth/confirm?confirmationToken=${user.confirmationToken}> Click here</a>
    <p>Note that this link will expire after 3 days from the date of sending this email.</p>
    </div>`
}

exports.options = options