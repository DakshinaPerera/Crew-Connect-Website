const { Router } = require('express');
const controller = require('./controller');

const router = Router();

// Login route
router.post('/login', controller.adminloginController);

module.exports = router;