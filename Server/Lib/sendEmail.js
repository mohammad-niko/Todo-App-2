import nodemailer from "nodemailer";

const sendEamil = async (email, sub, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "ToDo-App",
      to: email,
      subject: sub,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent for ${email} successfully`);
  } catch (error) {
    console.log("send email has error" + error);
    throw new Error({ message: "couldn't send email" });
  }
};

export default sendEamil;
