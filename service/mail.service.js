const e = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/cofiguration')

const sendmail = async(to)=>{
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:config.nodemailerUser,
            pass:config.nodemailerPassword
        }
    })
    const mailDetails = {
        from: config.nodemailerUser,
        to,
        subject : `Warranty verification.`,
        // text:  `this otp ${otp} is for Warranty verificaion.`
        html: `<h1>Product bill</h1><p>thank you!</p><img src="https://chart.googleapis.com/chart?chf=bg,s,65432100&cht=qr&chs=250x250&chl=ajsdfkjasdf">`
    }
    transport.sendMail(mailDetails,(err, res)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`mail send to ${to}`)
        }
    })
}
module.exports = {sendmail}