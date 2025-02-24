const nodemailer = require("nodemailer");

// Create a nodemailer transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jpj41976@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email with attachment
const sendEmail = async (to, subject, body, attachmentPath) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "smvreg23@gmail.com",
      to,
      subject,
      text: body,
      attachments: [
        {
          path: attachmentPath,
        },
      ],
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
