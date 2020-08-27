import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {


    const user =  new User(req.body);
    try {
        await user.save();
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
        let users = await User.find().select('name email hashed_password salt updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userByID = async (req, res, next, id) => {
    try {
        //If a matching user is found in the database, the user object is appended to the request
        // object in the profile key. Then, the next() middleware is used to propagate control
        // to the next relevant controller function. For example, if the original request was to
        // read a user profile, the next() call in userByID would go to the read controller
        // function, which is discussed next.
        console.log("---------------------------------------start found the user")

        let user = await User.findById(id);
      
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
//When the Express app gets a GET request at '/api/users/:userId', it executes the
// userByID controller function to load the user by the userId value, followed by the
// read controller function.
const read = (req, res) => {
    //The read function retrieves the user details from req.profile and removes
    // sensitive information, such as the hashed_password and salt values, before
    // sending the user object in the response to the requesting client.
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile)
}





//The update function retrieves the user details from req.profile and then uses the
// lodash module to extend and merge the changes that came in the request body to
// update the user data. Before saving this updated user to the database, the updated
// field is populated with the current date to reflect the last updated timestamp. Upon
// successfully saving this update, the updated user object is cleaned by removing
// sensitive data, such as hashed_password and salt, before sending the user object in
// the response to the requesting client.
const update = async (req, res, next) => {
    try {

        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user)
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


//The remove function retrieves the user from req.profile and uses the remove()
// query to delete the user from the database. On successful deletion, the requesting
// client is returned the deleted user object in the response.
const remove = async (req, res, next) => {
    try{
        let user = req.profile;
        let deleteUser = await user.remove();
        deleteUser.hashed_password = undefined;
        deleteUser.salt = undefined;
        res.json(deleteUser)

    }catch (err) {
        return res.json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    list,
    read,
    remove,
    update,
    userByID
}