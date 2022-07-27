const {PrismaClient} = require('@prisma/client');
const { sendmail } = require('../service/mail.service');
const prisma = new PrismaClient();

const {generateQR} = require('../service/qr.service')

const buy = async (req, res)=>{
    const {userid, productid}  = req.body;
    const isUser = await prisma.user.findUnique({
        where:{
            id:userid
        }
    })
    console.log(isUser)
    const isProduct = await prisma.product.findUnique({
        where:{
            id:productid
        }
    })
    console.log(isProduct)
    
    if (!isUser || !isProduct){
        return res.status(401).json({title:"wrong credentials", message:" user or product is not exist."})
    }
    const qrcode = await generateQR(userid, productid);
    // console.log(qrcode)
    // console.log(isUser.email, qrcode)
    await sendmail(isUser.email, qrcode)
    res.send("hope is working")
}

module.exports = {buy}