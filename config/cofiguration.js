require('dotenv').config();

const config = {
    port : process.env.PORT,
    nodemailerUser : process.env.NODEMAILER_USER,
    nodemailerPassword : process.env.NODEMAILER_PASSWORD,
}
module.exports = config;