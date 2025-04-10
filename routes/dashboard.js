const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { ensureAuthenticated } = require('../middleware/auth');

router.use(ensureAuthenticated);

router.get('/', dashboardController.getDashboard);
router.get('/manage_cameras', dashboardController.getManageCameras);
router.post('/cameras/add', dashboardController.addCamera);
router.get('/cameras/edit/:id', dashboardController.editCamera);
router.post('/cameras/update/:id', dashboardController.updateCamera);
router.delete('/cameras/delete/:id', dashboardController.deleteCamera);
router.get('/manage_recorders', dashboardController.getManageRecorders);
router.get('/manage_installation', dashboardController.getManageInstallation);

module.exports = router;