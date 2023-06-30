var nodemailer = require('nodemailer');

const dotenv = require('dotenv')
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'vishal.v@datayaan.com' ,
    pass: 'DexterMax@20'
  }
});

var mailOptions = {
  from: 'vishal.v@datayaan.com',
  to: 'stevengerrard084@gmail.com',
  subject: 'Hello Here',
  text: `Vanakam Da Mapla`
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports={transporter
}