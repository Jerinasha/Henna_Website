// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
// Load environment variables from .env (optional). Create a .env file with
// EMAIL_USER and EMAIL_PASS when running locally.
//require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure mail transporter once using environment variables (safer)
//const EMAIL_USER = process.env.EMAIL_USER || 'jerinsmehendiart@gmail.com';
//const EMAIL_PASS = process.env.EMAIL_PASS; // MUST be supplied via env or .env
const EMAIL_USER = "jerinsmehendiart@gmail.com";
const EMAIL_PASS = "ptij gzys wgub kurs";

if (!EMAIL_PASS) {
  console.warn('⚠️ EMAIL_PASS not set. Provide a Gmail App Password in the EMAIL_PASS environment variable or in a .env file. Emails will fail without it.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Verify transporter on startup so we catch auth/connectivity issues early
transporter.verify()
  .then(() => console.log('✅ Mailer ready — connected to SMTP provider'))
  .catch(err => console.warn('⚠️ Mailer verify failed — check EMAIL_USER / EMAIL_PASS and network', err.message || err));

// ✅ POST route to handle form submission
app.post('/send-mail', async (req, res) => {
  const { name, email, phone, address, date, bookingType, package, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  // Email content
  const mailOptions = {
    from: `"${name}" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: `New Mehendi Booking Request from ${name}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Address:</strong> ${address || 'N/A'}</p>
      <p><strong>Date of Mehendi Programme:</strong> ${date || 'N/A'}</p>
      <p><strong>Type of Booking:</strong> ${bookingType || 'N/A'}</p>
      <p><strong>Selected Package:</strong> ${package || 'Not selected'}</p>
      <p><strong>Message:</strong><br>${message || ''}</p>
    `,
  };

  try {
    // If EMAIL_PASS is not configured, skip real send and simulate success for local testing.
    if (!EMAIL_PASS) {
      console.warn('⚠️ EMAIL_PASS missing — simulating email send. No real email will be sent.');
      console.log('Simulated mail content:', mailOptions);
      return res.status(200).json({ success: true, message: '✅ (Simulated) Booking request received — SMTP not configured.' });
    }

  await transporter.sendMail(mailOptions);
  res.status(200).json({ success: true, message: '✅ Booking request sent successfully!'
  });
    

  } catch (error) {
    console.error('❌ Email error:', error);
    // In development show the error message to help debugging. In production do not leak SMTP details.
    const resp = { success: false, message: '❌ Failed to send email.' };
    if (process.env.NODE_ENV !== 'production') resp.error = error && error.message ? error.message : String(error);
    res.status(500).json(resp);
  }
});

// Run server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
