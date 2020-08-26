import express from 'express';
import authController from '../controllers/auth.controller';

const router  = express.Router();

//'/auth/signin': POST request to authenticate the user with their email
// and password
router.route('/auth/signin').post(authController.signin)

// '/auth/signout': GET request to clear the cookie containing a JWT that
// was set on the response object after sign-in
router.route('/auth/signout').get(authController.signout)


export default router;