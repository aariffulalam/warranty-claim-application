const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createSeller = async (req, res)=>{
    const {name, phoneNumber, email, password, type } =req.body;
    try {   
        const seller = await prisma.seller.create({
            data: {
                name, phoneNumber, email, password, type
            }
        })
        res.status(201).json({"title":"seller create", message:seller})
    } catch (error) {
        res.status(500).json({title:"Error", message:error})   
    }
}

module.exports = {createSeller}