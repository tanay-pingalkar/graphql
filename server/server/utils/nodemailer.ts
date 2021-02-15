import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import internal from "stream";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (
  to: string | Mail.Address | (string | Mail.Address)[],
  html: string | Buffer | internal.Readable | Mail.AttachmentLike
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "t6ya6m6wyferjviw@ethereal.email", // generated ethereal user
      pass: "GKgCHyb4C2D96cWSkB", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "change password", // Subject line
    text: html, // plain text body
    html: html,
  });
  console.log(transporter);
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
