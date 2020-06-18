import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.route('/api/users')
    .post(userController.create)
    .get(userController.list)

router.route('/api/users/:userId')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.remove)

router.param('userId',userController.userByID)

export default router;