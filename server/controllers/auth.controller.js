//The auth controller functions in server/controllers/auth.controller.js will
// not only handle requests to the signin and signout routes, but also provide JWT
// and express-jwt functionality to enable authentication and authorization for
// protected user API endpoints.

import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from "../../config/config";

//The POST request object receives the email and password in req.body. This email is
// used to retrieve a matching user from the database. Then, the password
// authentication method defined in UserSchema is used to verify the password that's
// received in req.body from the client.
//If the password is successfully verified, the JWT module is used to generate a signed
// JWT using a secret key and the user's _id value.
const signin = async (req, res, next) => {
    try {
        let user = await User.findOne({"email": req.body.email})
        if (!user) {
            res.status('401').json({
                error: "user not found"
            })
        }
        if (!user.authenticate(req.body.password)) {
            res.status('401').json({
                error: "username and password doesn't match"
            })
        }

        const token = jwt.sign({_id: user._id}, config.jwtSecret);
        res.cookie('t', token, {expires: new Date() + 9999})

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status('401').json({
            error: 'could not sign in'
        })
    }
};


//The signout function clears the response cookie containing the signed JWT. This is
// an optional endpoint and not really necessary for auth purposes if cookies are not
// used at all in the frontend.
//With JWT, user state storage is the client's responsibility, and there are multiple
// options for client-side storage besides cookies. On signout, the client needs to delete
// the token on the client-side to establish that the user is no longer authenticated.

const signout = (req, res, next) => {
    res.clearCookie("t");

    return res.status('200').json({
        message: "Sign out"
    })

};

//express-jwt to verify
// that the incoming request has a valid JWT in the Authorization header. If the token
// is valid, it appends the verified user's ID in an 'auth' key to the request object;
// otherwise, it throws an authentication error.
const requireSignin = expressJwt({
    secret:config.jwtSecret,
    algorithms: ['HS256'],
    userProperty:'auth'
})
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }

    next()
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}