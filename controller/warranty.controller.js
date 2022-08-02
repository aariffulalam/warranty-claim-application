const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {sendmail} = require('../service/mail.service')
const {otp} = require('../service/otp.service')

// Redis
const client = require("../database/redis")

// read QRCode
// const fs = require("fs").promises;
// const Jimp = require('jimp');
// const qrCode = require('qrcode-reader');


// started from new
const warrantyRegistration = async (req, res)=>{
    const {name, number, email, distributor, purchaseDate, product, orderNumber, serialNumber} = req.body;
    console.log(purchaseDate)
    const date = purchaseDate+"T00:00:00Z"
    console.log(date)
    // const date = purchaseDate.split("-")

    try {    
        const register = await prisma.warrantyRegistration.create({
            data:{
                name,
                number,
                email,
                distributor,
                purchaseDate:date,
                product,
                orderNumber,
                serialNumber
            }
        });
        await sendmail(email, otp) 
        client.setEx("otp",60*60*24, otp)
        res.status(200).json({title:"success", message:"successfull registered", data:register});
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    };
};

const warrantyVerification = async (req, res)=>{
    const {otp, orderNumber} = req.body;
    // console.log(otp, orderNumber)
    
    const redisOTP = await client.get("otp", (err, res)=>{
        return res
    })
    console.log(redisOTP)
    if (redisOTP != otp){
        return res.status(400).json({title:"invalid input", message:"user otp is wrong."})
    }

    const register = await prisma.warrantyRegistration.findUnique({
        where:{
            orderNumber
        }
    })
    if (!register){
        return res.status(400).json({title:"wrong user", message:"user not registered."});
    }
    else if(register.verify){
        return res.status(400).json({title:"vrification", message:"user already verified"});
    }
    // console.log("i am working")
    const verify = await prisma.warrantyRegistration.update({
        where:{
            orderNumber
        },
        data:{
            verify:true
        }
    })
    res.status(200).json({title:"success", message:"user verified", verification:verify})
}

const registerComplain = async (req, res)=>{
    const {name, email, number, distributor, product, orderNumber, serialNumber, purchaseDate, productGroup, problem, problemDescription, shippingAddress, pickupAddress} = req.body;
    console.log(req.body)

    
    const fileName = req.file.path.split("/")[1]
    // console.log(fileName)
    try {        
        const register = await prisma.warrantyRegistration.findUnique({
            where:{
                orderNumber
            }
        })
        // console.log(register)
        if (!register){
            // console.log("if")
            return res.status(400).json({title:'Registration Error', message:"warranty not register"})
        }
        else if (!register.verify){
            // console.log("else")
            return res.status(400).json({title:"verification Error", message:"user not verified in warranty registration form"})
        }
        
        // console.log(orderNumber)
        // console.log("i am elsesssss")
        // console.log(orderNumber, serialNumber, fileName, register.id)
        // console.log("i am elsesssss")

        // finding how much days 
        const currentDate = new Date();
        const invoiceDate = new Date(purchaseDate.split("T"))
        const time = Math.abs(currentDate - invoiceDate)
        const days = Math.ceil(time/(1000*60*60*24))
        if (days>365){
            return res.status(400).json({title:"Error", message:'This products warranty is already copleted'})
        }

        const createWarrantyClaim = await prisma.warrantyClaim.create({
            data:{productGroup,
                problem,
                problemDescription,
                shippingAddress,
                pickupAddress,
                orderNumber,
                serialNumber,
                invoice : fileName,
                registrationId:register.id
            }
        })
        // console.log(createWarrantyClaim)
        res.status(200).json({title:"successful", message:`warranty claimed successfully `, data: createWarrantyClaim})
    } 
    catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }
}
    
module.exports = {warrantyRegistration, warrantyVerification, registerComplain}