const express = require('express');
const {handleUserSignup,handleUserLogin} = require('../controllers/user');

const { handleGenerateShortUrl } = require('../controllers/url');
const router = express.Router();

router.post('/',handleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;