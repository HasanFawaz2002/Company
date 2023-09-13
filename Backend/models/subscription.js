const mongoose = require('mongoose');
const InstitutionModel = require('../models/institution');


const SubcriptionSchema = new mongoose.Schema({

    institutionID: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Institution',
            validate: {
                validator: async function (value) {
                    const institutionExists = await InstitutionModel.exists({ _id: value });
                    return institutionExists;
                },
                message: 'Institution does not exist.'
            }
      },
   
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
    role:{
        type: String,
        default:'subscriber',
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


const SubcriptionModel = mongoose.model('Subscription', SubcriptionSchema);


module.exports = SubcriptionModel;
