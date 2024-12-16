const { Router } = require('express');
const controller = require('./controller');

const router = Router();


router.get('/getavjobs', controller.getEmpAvailableJobs);



module.exports = router;