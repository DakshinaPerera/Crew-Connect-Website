// src/auth/routes.js
const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/login', controller.adminLoginController);
router.post('/refresh', controller.refreshTokenController);
router.post('/logout', controller.logoutController);
router.get('/protected', controller.verifyToken, controller.getProtectedData);

module.exports = router;