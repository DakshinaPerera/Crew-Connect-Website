const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// Login route
router.post('/admin/login', controller.adminLoginController);

module.exports = router;