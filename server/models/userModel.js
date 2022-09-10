const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'you must enter a name'],
            trim: true,
            minlength: [1, 'please provide non empty name'],
            maxlength: [20, "name can't be longer than 20 characters"],
            unique:true,
        },
        password: {
            type: String,
            required: [true, 'you must enter a password'],
            trim: true,
            select: false,
            minlength: 1,
            select: false,
        },
        email: {
            type: String,
            required: [true, 'you must enter an email'],
            trim: true,
            unique: [true, 'email already in use'],
            min: [6, 'please provide non empty email'],
            max: [50, 'too long email address'],
            validate: [validator.isEmail, 'invalid email'],
        },
        active: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['buyer', 'editor', 'admin'],
            default: 'buyer',
        },
        address: {
            type: String,
            reuired: true,
            trim: true,
        },
        // confirmPassword: {
        //     type: String,
        //     required: true,
        //     validate: {
        //         validator: function (confirmPassword) {
        //             return confirmPassword === this.password;
        //         },
        //         message: "passwords don't match",
        //     },
        // },
    },
);

// userSchema.pre(/^find/,function(next){
//     this.populate({        
//         path:"reviews",
//         select:"-__v"    
//     });
//     next()
// });

const User = mongoose.model('users', userSchema);

module.exports = User;