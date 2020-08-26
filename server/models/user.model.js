import mongoose from 'mongoose';
//The mongoose.Schema() function takes a schema definition object as a parameter to
// generate a new Mongoose schema object that will specify the properties or structure
// of each document in a collection.
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: 'Name is Required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid Email Address'],
        required: 'Email is required'
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated: Date,

    hashed_password: {
        type: String,
        required: 'Password is required'
    },

    salt: String

})

UserSchema
    .virtual('password')
    .set(
        function (password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password)
        }
    ).get(
    function () {
        return this._password;
    }
)

UserSchema.methods = {
    //authenticate: This method is called to verify sign-in attempts by
    // matching the user-provided password text with the hashed_password
    // stored in the database for a specific user.
    authenticate: function (plain_text) {
        return this.encryptPassword(plain_text) === this.hashed_password
    },

    //encryptPassword: This method is used to generate an encrypted hash
    // from the plain-text password and a unique salt value using the crypto
    // module from Node
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            //The crypto module provides a range of cryptographic
            // functionality, including some standard cryptographic hashing
            // algorithms. In our code, we use the SHA1 hashing algorithm
            // and createHmac from crypto to generate the cryptographic
            // HMAC hash from the password text and salt pair.
            return crypto.createHmac('sha1', this.salt).update(password).digest("hex")
        } catch (error) {
            return '';
        }
    },
    //makeSalt: This method generates a unique and random salt value using
    // the current timestamp at execution and Math.random()
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)
export default mongoose.model('User', UserSchema)

//Hashing algorithms generate the same hash for the same input
// value. But to ensure two users don't end up with the same hashed
// password if they happen to use the same password text, we pair
// each password with a unique salt value before generating the
// hashed password for each user. This will also make it difficult to
// guess the hashing algorithm being used because the same user input
// is seemingly generating different hashes.