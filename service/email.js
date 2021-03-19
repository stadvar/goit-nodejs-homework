const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  //   constructor(env) {}
  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "System Contacts",
        link: "http://localhost:3000/",
      },
    });
    const template = {
      body: {
        name, // name
        intro: "Это у нас вступление письма, тут какой-то текст .",
        action: {
          instructions: "Чтобы продолжить работу нажмите здесь:",
          button: {
            color: "#22BC66", // Optional action  button color
            text: "Подтвердите Ваш аккаунт",
            link: `http://localhost:3000/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email, // Change to your recipient
        from: "stadvar@gmail.com", // Change to your verified sender
        subject: "Подтверждение регистрации",
        // text: "and easy to do anywhere, even with Node.js",
        // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        html: emailBody,
      };
      await sgMail.send(msg);
    } catch (e) {
      next({ code: 503, message: "Service Unavailable" });
    }
  }
}

module.exports = EmailService;
