const router = require('express').Router();
const { buy } = require('../controller/buy.controller');

router.post('/',buy);

module.exports = router;