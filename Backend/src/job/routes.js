const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/alljobs', controller.getJobs);
router.post('/addjob', controller.addJob);
router.put('/editjob/:id', controller.editJob);
router.delete('/deletejob/:id', controller.deleteJob);




module.exports = router;