const e = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/cofiguration')

const sendmail = async(to, otp)=>{
    console.log("i am in email ",to, " and this is otp ", otp)
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
        html: `<div class="c-email" style="
        overflow: hidden;
        background-color:#c2dbfc;
        box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1)">
            <div class="c-email__header" style="background-color: #0fd59f; width: 100%; height: 60px;">
                <h1 class="c-email__header__title" style="font-size: 23px; margin: 0; text-align: center; color: white; padding-top: 20px;">Your Verification Code is</h1>
            </div>
            <div class="c-email__content" style="width: 100%; background-color: #fff; padding: 15px; text-align: center; background-color:#c2dbfc;">
                <p class="c-email__content__text text-title"
                    style="font-size: 20px;  text-align: center; color: #343434; margin-top: 0;">
                   This is Warranty application.
                </p>
                <div class="c-email__code" style="display: block;
                width: 60%;
                margin: 30px auto;
                background-color: #ddd;
                border-radius: 40px;
                padding: 20px;
                text-align: center;
                font-size: 36px;
                letter-spacing: 10px;
                box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);">
                    <span class="c-email__code__text">${otp}</span>
                </div>
                <p class="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 1
                    hour</p>
                </div>
                <!-- <div class="c-email__footer" style="width: 100%; height: 60px; background-color: #fff; box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);"></div> -->
                <p style="text-align: center;">Don't share the otp with any one</p>
        </div>`
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