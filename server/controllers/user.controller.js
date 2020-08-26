import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const User = new User(req.body);
    try {
        await User.save();
        return res.status(200).json(
            {
                message: "Successfully signed up!"
            }
        )
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }

}
const list = async (req, res) => {

    try {
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userByID = (req, res, next, id) => {
    try {
        //If a matching user is found in the database, the user object is appended to the request
        // object in the profile key. Then, the next() middleware is used to propagate control
        // to the next relevant controller function. For example, if the original request was to
        // read a user profile, the next() call in userByID would go to the read controller
        // function, which is discussed next.
        let user = User.findById(id);
        if (!user) {
            return res.status('400').json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next();

    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve the user"
        })
    }
}
const read = (req, res) => {
}
const update = (req, res, next) => {
}
const remove = (req, res, next) => {
}

export default {
    create,
    list,
    read,
    remove,
    update,
    userByID
}