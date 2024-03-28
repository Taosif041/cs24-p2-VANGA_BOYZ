const nodemailer = require("nodemailer");
async function sendEmail(userMail, OPT) {
  // Create a transporter object using the default SMTP transport
  let htmlBody = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
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
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>You are receiving this email because we received a password reset request for your account.</p>
      <p>Your One-Time Password (OTP) is:</p>
      <p><strong>${OPT}</strong></p>
      <p>This OTP is valid for 10 minutes and can be used only once. If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
    </div>
    <div class="footer">
      <p>Thank you for using our services.</p>
    </div>
  </div>
  </body>
  </html>
  
    `;
  let textBody = `Password Reset Request

    Hello,
    
    You are receiving this email because we received a password reset request for your account.
    
    Your One-Time Password (OTP) is: ${OPT}
    
    This OTP is valid for 10 minutes and can be used only once. If you did not request a password reset, please ignore this email or contact support if you have any concerns.
    
    Thank you for using our services.
       `;
  console.log(process.env.EMAIL);
  console.log(process.env.EMAIL_PASSWORD);

  let transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred service
    auth: {
      user: process.env.EMAIL, // Your email address from .env file
      pass: process.env.EMAIL_PASSWORD, // Your email password from .env file
    },
  });

  // Set up email data
  let mailOptions = {
    from: {
      name: "Ecosync",
      address: process.env.EMAIL, // Sender address from .env file
    },
    to: userMail, // List of receivers
    subject: "Password Change", // Subject line
    text: textBody, // Plain text body
    html: htmlBody, // HTML body content
  };

  // Send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = sendEmail;
