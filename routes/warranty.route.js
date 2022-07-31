const router = require('express').Router();
const {upload} = require('../middleware/multer')

const { first, third, warrantyRegistration, warrantyVerification, registerComplain } = require('../controller/warranty.controller');

router.post('/first', first )
// router.post("/second",)
router.post("/third",upload.single('invoice'), third)

// started from new
router.post("/register",warrantyRegistration)
router.post("/vrify", warrantyVerification)
router.post("/claim", upload.single('invoice'),registerComplain)


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
