const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient()

const createUser = async(req, res)=>{
    const {name, profilePicture, phoneNumber, email, password} = req.body;
    try {        
        const user = await prisma.user.create({
            data:{
                name, profilePicture, phoneNumber, email, password
            }
        });
        res.status(201).json({title:"user created", message:user})
    } catch (error) {
        res.status(500).json({title:"Error", message:error})
    }
};

module.exports = {createUser}