const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res)=>{
    const {name, price, brand, image, model, description, stock, sellerId } =req.body;
    try {   
        const product = await prisma.product.create({
            data: {
                name, price, brand, image, model, description, stock, sellerId 
            }
        })
        res.status(201).json({"title":"seller create", message:product})
    } catch (error) {
        res.status(500).json({title:"Error", message:error})   
    }
}

module.exports = {createProduct}