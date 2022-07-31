const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {sendmail} = require('../service/mail.service')
const {otp} = require('../service/otp.service')

// read QRCode
// const fs = require("fs").promises;
// const Jimp = require('jimp');
// const qrCode = require('qrcode-reader');


// started from new
const warrantyRegistration = async (req, res)=>{
    const {name, number, email, distributor, purchaseDate, product, orderNumber, serialNumber} = req.body;
    console.log(Date(purchaseDate))
    // const date = purchaseDate.split("-")

    try {    
        const register = await prisma.warrantyRegistration.create({
            data:{
                name,
                number,
                email,
                distributor,
                purchaseDate,
                product,
                orderNumber,
                serialNumber
            }
        });
        await sendmail(email, otp) 
        res.status(200).json({title:"success", message:register});
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    };
};

const warrantyVerification = async (req, res)=>{
    const {otp, orderNumber} = req.body;
    console.log(otp, orderNumber)
    const register = await prisma.warrantyRegistration.findUnique({
        where:{
            orderNumber
        }
    })
    if (!register){
        return res.status(201).json({title:"wrong user", message:"user not registered."});
    }
    else if(register.verify){
        return res.status(201).json({title:"vrification", message:"user already verified"});
    }
    console.log("i am working")
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
            console.log("if")
            return res.status(201).json({title:'Registration Error', message:"warranty not register"})
        }
        else if (!register.verify){
            console.log("else")
            return res.status(201).json({title:"verification Error", message:"user not verified in warranty registration form"})
        }
        console.log(orderNumber)
        console.log("i am elsesssss")
        console.log(orderNumber, serialNumber, fileName, register.id)
        console.log("i am elsesssss")
        const createWarrantyClaim = await prisma.warrantyClaim.create({
            data:{
                orderNumber,
                serialNumber,
                invoice : fileName,
                registrationId:register.id
            }
        })
        console.log(createWarrantyClaim)
    } 
    catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }

}
    
module.exports = {warrantyRegistration, warrantyVerification, registerComplain}