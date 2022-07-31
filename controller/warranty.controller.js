const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {sendmail} = require('../service/mail.service')
const {otp} = require('../service/otp.service')

// read QRCode
const fs = require("fs").promises;
const Jimp = require('jimp');
const qrCode = require('qrcode-reader');


const first  = async (req, res)=>{
    const {name, model} = req.body;
    try {
        
        const check = await prisma.product.findMany({
            where:{
                name, model
            }
        })
        if (check.lenght === 0){
            res.status(400).json({message:"this product is not exist."})
        }else{
            res.status(200).json({title:"success", message:"product is exist."})
        }
    } catch (error) {
        res.status(500).json({title:"Error", message:error})   
    }
}

const second  = async (req, res)=>{
    const {name, email, phoneNumber} = req.body
    sendmail(email, otp)
}

const third = async (req, res)=>{
    const {name, email, phoneNumber, shippingAddress, pickupAddress, productDescriptioin, purchaseDate} = req.body
    const fileName = req.file.path.split("/")[1]
    const bufferData = await fs.readFile(`./public/${fileName}`)
    console.log("i am buffer data  ", bufferData)
    // const bufferData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKpSURBVO3BQW7kQAwEwUxC//9yrY88NSBIM2sTjDA/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4iGVb0pCp3KShE7lJAmdyjcl4YlijVKsUYo1ysXLkvAmld8kCW9SeVOxRinWKMUa5eLDVO5IwicloVN5QuWOJHxSsUYp1ijFGuXij0tCp9KpdEnokjBJsUYp1ijFGuXij1M5SUKncpKEv6xYoxRrlGKNcvFhSfikJNyRhDcl4Tcp1ijFGqVYo1y8TOWbVLokdCpdEjqVLgknKr9ZsUYp1ijFGsX8YI1RrFGKNUqxRrl4SKVLwonKNyWhU+mS0Kl0SThR6ZLQqdyRhCeKNUqxRinWKBcPJeFEpUtCp3KShE7lTSp3qJyodEnoVD6pWKMUa5RijXLxnyWhU+lUTpLQqTyRhDuS0KmcJKFTeVOxRinWKMUaxfzgAZVPSkKnckcSTlTelIQTlS4JbyrWKMUapVijXHxYEp5QOUnCHSqfpHKHSpeEJ4o1SrFGKdYoFw8l4ZOScKLSJaFT6ZLQqdyRhDtUvqlYoxRrlGKNcvGQyjcl4USlS0Kn0iXhTSonSehU3lSsUYo1SrFGuXhZEt6kckcSTpJwh0qXhJMkdConSXhTsUYp1ijFGuXiw1TuSMITKidJOFG5Q6VLwolKl4Q3FWuUYo1SrFEuhkvCicodKnck4ZuKNUqxRinWKBd/XBJOVJ5IQqdyotIloVM5ScITxRqlWKMUa5SLD0vCN6l0SehUTpJwRxI6lf+pWKMUa5RijXLxMpVvUumS0Kl0SehUOpUuCScqXRI6lZMkvKlYoxRrlGKNYn6wxijWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNco/SAn3+6r0F7kAAAAASUVORK5CYII="
    try {
        
        Jimp.read(bufferData, function(err, image){
            if(err){
                console.log("first error",err)
            }
            let qrcode = new qrCode();
            qrcode.callback = function(err, value){
                if(err){
                    console.log("second error",err)
                }
                console.log(value)
            };
            qrcode.decode(image.bitmap);
        })
        res.send("i am working")
    } catch (error) {
        console.log(error)
    }
}


// started from new
const warrantyRegistration = async (req, res)=>{
    const {name, number, email, distributor, purchaseDate, product, orderNumber, serialNumber} = req.body;
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
        res.status(200).json({title:"success", message:register});
        sendmail(email, otp) 
    } catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    };
};

const warrantyVerification = async (req, res)=>{
    const {otp, orderNumber} = req.body;
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
    const {name, email, number, distributor, product, orderNumber,purchaseDate, productGroup, problem, problemDescription, shippingAddress, pickupAddress} = req.body;
    const fileName = req.file.path.split("/")[1]
    try {        
        const register = await prisma.warrantyRegistration.findUnique({
            where:{
                orderNumber
            }
        })
        if (!register){
            return res.status(201).json({title:'Registration Error', message:"warranty not register"})
        }
        else if (!register.verify){
            return res.status(201).json({title:"verification Error", message:"user not verified in warranty registration form"})
        }
        const createWarrantyClaim = await prisma.warrantyClaim.create({
            data:{
                orderNumber,
                serialNumber,
                invoice : fileName,
                registrationId:register.id
            }
        })
    } 
    catch (error) {
        res.status(500).json({title:"Error", message:"internal error", error})
    }

}
    
module.exports = {first, third, warrantyRegistration, warrantyVerification, registerComplain}
