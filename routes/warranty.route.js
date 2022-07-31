const router = require('express').Router();
const {upload} = require('../middleware/multer')

const { warrantyRegistration, warrantyVerification, registerComplain } = require('../controller/warranty.controller');


// started from new
router.post("/register",warrantyRegistration)
router.get("/verify", warrantyVerification)
router.post("/claim", upload.single('invoice'),registerComplain)


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
