const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,             // e.g. "smtp.gmail.com"
      service: process.env.SERVICE,       // e.g. "gmail"
      port: 587,
      secure: false,                      // TLS on 587 = false
      auth: {
        user: process.env.SMTP_USER,      // your Gmail / SMTP email
        pass: process.env.SMTP_PASS,      // your Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,        // email sender
      to: email,                          // receiver
      subject: subject,
      text: text,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;                          // allow controller to handle it
  }
};