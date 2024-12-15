const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/alljobs', controller.getJobs);
router.post('/addjob', controller.addJob);





module.exports = router;