const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse app json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello bro");
});

app.post("/", async (req, res) => {
  const { email } = req.body;
  console.log('req', req.body)

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "milford.marquardt@ethereal.email",
      pass: "Rcer1ezEHjCZEpDV5V",
    },
  });

  const message = {
    from: '"Febrilian Express.js" <febrilian@outlook.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "What's Up? ✔", // Subject line
    text: "Hello, long time no see.", // plain text body
    html: "<b>Hello, long time no see.</b>", // html body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.send(`Email sent!`);
});

app.listen(port, () =>
  console.log(`Example app is listening at http://localhost:${port}`)
);
