import express from 'express';
import userController from '../controllers/user.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();


router.route('/api/users')
    .post(userController.create)
    .get(userController.list)

router.route('/api/users/:userId')
    .get(authController.requireSignin, userController.read)
    .put(authController.requireSignin, authController.hasAuthorization, userController.update)
    .delete(authController.requireSignin, authController.hasAuthorization, userController.remove)

router.param('userId', userController.userByID)

export default router;