const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

function sendEmail(userMail,userPass) {
    // Create a transporter object using the default SMTP transport
    let htmlBody = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Ecosync</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Consolas:wght@400;700&display=swap');
      body {
        font-family: 'Consolas', monospace;
        background-color: #87CEEB;
        color: #333;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
        color: #333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        line-height: 1.6;
      }
      .footer {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: center;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .footer p {
        margin: 0;
        font-size: 0.9em;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Ecosync!</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>Your Ecosync account has been set up successfully. Below are your initial login details:</p>
        <p><strong>Email:</strong> ${userMail}</p>
        <p><strong>Temporary Password:</strong> ${userPass}</p>
        <p>Please ensure to change your temporary password upon your first login for security purposes.</p>
      </div>
      <div class="footer">
        <p>If you did not request this email, please disregard it.</p>
      </div>
    </div>
    </body>
    </html>
    `;
    let textBody = `Welcome to Ecosync!

    Hello,
    
    Your Ecosync account has been set up successfully. Here are your initial login details:
    
    Email: ${userMail}
    Temporary Password: ${userPass}
    
    Please ensure to change your temporary password upon your first login for security purposes.
    
    If you did not request this email, please disregard it.
    `;
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASSWORD);

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your preferred service
        auth: {
            user: process.env.EMAIL, // Your email address from .env file
            pass: process.env.EMAIL_PASSWORD // Your email password from .env file
        }
    });

    // Set up email data
    let mailOptions = {
        from: {
            name: 'Ecosync',
            address: process.env.EMAIL // Sender address from .env file
        },
        to: userMail, // List of receivers
        subject: 'New account created on Ecosync.', // Subject line
        text: textBody, // Plain text body
        html: htmlBody // HTML body content
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("error");
        }
        console.log('Message sent: %s', info.messageId);
    });
}
sendEmail("adibur6@gmail.com","123456");

module.exports = sendEmail;
