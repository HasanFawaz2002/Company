const mongoose = require('mongoose');

const SubcriptionSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        //unique: true, // Add unique index to enforce uniqueness
    },
    location:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: [true, 'Email address must be unique.'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
    },
    password:{

    },
    position: {
        type: String,
        enum: ['HR', 'Admin', 'Hiring manager'],
    },
    status: {
        type: String,
        default: 'verified', 
    },
    expirationTime: {
        type: Date,
        required: true,
    }

   
},{ timestamps: true }
);


const SubcriptionModel = mongoose.model('Institution', SubcriptionSchema);


module.exports = SubcriptionModel;
