var nodemailer = require("../node_modules/nodemailer/lib/nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mateusarga21@gmail.com',
    pass: 'Mateus@21'
  }
});

var mailOptions = {
  from: 'mateusarga21@gmail.com',
  to: 'argastramateus@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});