const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {authMiddleware} = require('../middleware/auth.middleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use(authMiddleware);

router.put('/update-profile', authController.updateProfile);
router.get('/check-auth', authController.checkAuth);

module.exports = router;