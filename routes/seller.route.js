const { createSeller } = require('../controller/seller.controller');

const router = require('express').Router();

router.post('/create',createSeller)

module.exports = router;
