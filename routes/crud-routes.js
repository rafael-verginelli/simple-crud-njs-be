const express = require("express");
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/getUsers', userController.getUsers);
router.get('/getUser/:userId', userController.getUser);
router.post('/createUser', userController.createUser);
router.delete('/deleteUser', userController.deleteUser);
router.put('/editUser', userController.editUser);

module.exports = router;
