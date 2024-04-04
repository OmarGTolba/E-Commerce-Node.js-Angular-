const nodemailer = require('nodemailer')

const contact = async function(req, res){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      })
    
      const mailOptions = {
        from: req.body.email,
        to: process.env.USER_EMAIL,
        subject: `Message from ${req.body.firstname} ${req.body.lastname}`,
        html: `<div>
        <h3 style="color: #3b5d50;">${req.body.message}</h3>
        </div>`,
      }
      transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
          console.log(err)
          res.send({message:'err'})
        } else {
          console.log('Email sent: ' + success.response)
          res.send({message:'sent'})
        }
      })
}
module.exports = contact