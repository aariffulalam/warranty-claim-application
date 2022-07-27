const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {sendmail} = require('../service/mail.service')
const {otp} = require('../service/otp.service')


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
    
}

module.exports = {first, third}