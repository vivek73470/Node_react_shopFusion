const express = require('express');
const Contact = require('../model/contact/contactmodel')
const nodemailer = require('nodemailer');
require('dotenv').config()

const contactRouter = express.Router();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MailerGmail,
        pass: process.env.MailerPass
    }
})

function sendMail(to, subject, msg) {
    return transporter.sendMail({
        from: process.env.MailerGmail,
        to: to,
        subject: subject,
        html: msg
    });
}

contactRouter.post('/send', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });
        await newContact.save();


        // Prepare email content
        const emailContent = `
            <h3>Contact Form Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        await sendMail(process.env.MailerGmail, 'Contact Form Submission', emailContent);
        res.status(200).json({ message: 'Email sent successfully!' });


    } catch (error) {
        console.error('Error while sending email:', error);
        res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
})


module.exports = contactRouter;
