const express = require('express');
const router = express.Router();

const userCtrl = require('../user.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;