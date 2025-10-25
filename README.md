Setup and run (local)
=====================

1. Install dependencies:

   npm install

2. Create a .env file (copy `.env.example`) and fill in your Gmail credentials:

   EMAIL_USER=jerinsmehendiart@gmail.com
   EMAIL_PASS=<your-gmail-app-password>

   To generate an app password: enable 2-Step Verification in your Google account, then create an App Password (Mail -> Other -> give a name). Use the generated 16-character password as `EMAIL_PASS`.

3. Start the server:

   node server.js

4. Open `contact.html` in your browser and submit the form. Check the server console for logs.

If you see "Missing credentials for 'PLAIN'" or "Mailer verify failed", double-check `EMAIL_PASS` is set and that your machine can reach Gmail's SMTP server.
