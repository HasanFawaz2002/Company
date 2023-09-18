const mongoose = require('mongoose');
const FormModel = require('../models/form');
const UserModel = require('../models/user');

const FormValuesSchema = new mongoose.Schema(
  {
    studentID: {
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
    formID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomizableForm',
      validate: {
        validator: async function (value) {
          const formExists = await FormModel.exists({ _id: value });
          return formExists;
        },
        message: 'Form does not exist.'
      }
    },
    // Use the Mixed type to allow dynamic fields
    dynamicFields: mongoose.Schema.Types.Mixed
  }
);

const FormValues = mongoose.model('FormValues', FormValuesSchema);

module.exports = FormValues;
