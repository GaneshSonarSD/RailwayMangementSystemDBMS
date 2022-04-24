const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



///create,find,update
router.get('/', userController.view);
router.post('/', userController.find);
//fav train
router.get('/central', userController.central);
router.get('/west', userController.west);
router.post('/dest', userController.dest);
router.post('/adduser', userController.create);
router.get('/adduser', userController.form);
router.get('/addfav/:departure_time', userController.editfav);
router.get('/clearfav', userController.clear);
router.post('/addfav', userController.addf);
router.get('/fav', userController.favt);
router.get('/admin', userController.check);
router.get('/:departure_time', userController.delete);
router.get('/delfav/:departure_time', userController.deletefav);

router.get('/edituser/:departure_time', userController.edit);
router.get('/editcent/:departure_time', userController.edits);
router.post('/editcent/:departure_time', userController.updates);
router.post('/edituser/:departure_time', userController.update);




/// fav trains routing





module.exports = router;