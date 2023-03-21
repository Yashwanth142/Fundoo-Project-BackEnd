import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { resetAuth } from '../middlewares/resetAuth.middleware';

const router = express.Router();

//route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.Signup);

//route to get a single user by their user email id
router.get('/login', userAuth, userController.Login);

router.post('/forgetPassword', userController.forgetPassword);

router.post('/resetPassword/:token', resetAuth, userController.ResetPassword);

export default router;
