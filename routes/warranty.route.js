const router = require('express').Router();
const {upload} = require('../middleware/multer')

const { first, third } = require('../controller/warranty.controller');

router.get('/fist', first )
// router.post("/second",)
router.post("/third",upload.single('invoice'), third)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
