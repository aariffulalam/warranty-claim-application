const router = require('express').Router();

// requiring controlls
const { createUser } = require('../controller/user.controller');


router.post('/create', createUser)

module.exports = router;