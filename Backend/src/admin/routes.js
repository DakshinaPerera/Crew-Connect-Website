const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/login', controller.adminLogin);
router.get('/alljobs', controller.getJobs);
router.post('/addjob', controller.addJob);
router.put('/editjob/:id', controller.editJob);
router.delete('/deletejob/:id', controller.deleteJob);
router.get('/search', controller.searchJobs);
router.put('/status/:id', controller.setJobStatus);



module.exports = router;