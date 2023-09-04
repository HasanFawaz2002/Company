const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        //unique: true, // Add unique index to enforce uniqueness
    },
    firstname: {
        type: String,
        required: true,
        //unique: true, // Add unique index to enforce uniqueness
    },
    lastname: {
        type: String,
        required: true,
        //unique: true, // Add unique index to enforce uniqueness
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: [true, 'Email address must be unique.'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: {
            validator: function (value) {
                // Minimum length of 6 characters
                if (value.length < 6) {
                    return false;
                }

                // At least one capital letter
                if (!/[A-Z]/.test(value)) {
                    return false;
                }

                return true;
            },
            message: 'Password must be at least 6 characters long and contain at least one capital letter.'
        }
    }
},{ timestamps: true }
);


const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;



//connect();