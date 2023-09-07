const mongoose = require('mongoose');
const InstitutionModel = require('../models/institution');
const UserModel = require('../models/user');



const CertificateUploadSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            validate: {
                validator: async function (value) {
                    const userExists = await UserModel.exists({ _id: value });
                    return userExists;
                },
                message: 'User does not exist.'
            }
      },
    name: {
    type: String,
    required: true,
    },
    description:{
    type: String,
    required: true,
    },
    image:{
    type: String,
    required: true,
    },
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
    }
  
});

const CertificateUpload = mongoose.model('CertificateUpload', CertificateUploadSchema);

module.exports = CertificateUpload;
