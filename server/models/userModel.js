const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a name'],
            trim: true,
            minlength: [1, 'please provide non empty name'],
            maxlength: [20, "name can't be longer than 20 characters"],
        },
        password: {
            type: String,
            required: [true, 'you must enter a password'],
            trim: true,
            select: false,
            minlength: 1,
        },
        email: {
            type: String,
            required: [true, 'you must enter an email'],
            unique: [true, 'email already in use'],
            min: [6, 'please provide non empty email'],
            max: [50, 'too long email address'],
            validate: [isEmail, 'invalid email'],
        },
        active: {
            type: Boolean,
            default: true,
        },
        confirmPassword: {
            type: String,
            required: true,
            validate: {
                validator: function (confirmPassword) {
                    return confirmPassword === this.password;
                },
                message: "passwords don't match",
            },
        },
    },
);


const User = mongoose.model('Users', userSchema);
module.exports = User;
