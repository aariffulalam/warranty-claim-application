const QRCode = require('qrcode');

const generateQR = async(userid, productid)=>{
    // const qrCode = await QRCode.toDataURL(JSON.stringify({userid, productid}))
    const qrCode = await QRCode.toDataURL([{userid, productid}])
    console.log(qrCode)
    return qrCode
}

module.exports = {generateQR}