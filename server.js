// server.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://color-glo.vercel.app', // Specific allowed origin
    methods: 'GET,POST,OPTIONS',  // Allow specific methods
    allowedHeaders: 'Content-Type',  // Allow specific headers
    credentials: true  // If you need to allow credentials (like cookies)
}));
  
app.use(bodyParser.json());

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

app.post('/api/send', (req, res) => {  // Updated route
    const { name, email, mobile, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'u22cs086@coed.svnit.ac.in',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error); 
            res.status(500).send({ message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
