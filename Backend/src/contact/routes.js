const { Router } = require('express');
const controller = require('./controller');

const router = Router();


router.post('/sendcontact', controller.sendContactUsEmail);



module.exports = router;