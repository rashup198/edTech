const express = require('express');
const router = express.Router();

// Controllers
const {capturePayment,verifySignature} = require('../controllers/Payments');
const {auth, isInstrutor,isAdmin,isStudent} = require('../middlewares/auth');

// Payment routes

// capture payment
router.post('/capturePayment',auth,isStudent,capturePayment);

// verify signature
router.post('/verifySignature',verifySignature);


module.exports = router;