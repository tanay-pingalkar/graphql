import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import internal from "stream";
import dotenv from "dotenv";
dotenv.config();

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (
  to: string | Mail.Address | (string | Mail.Address)[],
  html: string | Buffer | internal.Readable | Mail.AttachmentLike
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: process.env.EMAIL, // sender address
      to: to, // list of receivers
      subject: "change password", // Subject line
      text: html, // plain text body
      html: html,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("info:", info);
      }
    }
  );
};
