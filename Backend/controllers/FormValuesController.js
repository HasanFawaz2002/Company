const asyncHandler = require("express-async-handler");
const FormValues = require("../models/formValues");

const storeFormValues = asyncHandler(async (req, res) => {
  try {
    const studentID = req.user.user.id;
    const formID = req.params.formID;
    const certificateID = req.params.certificateID;
    const certificateRequestID = req.params.certificateRequestID;

    const dynamicFieldsArray = [];

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        dynamicFieldsArray.push({
          key: key,
          value: req.body[key],
        });
      }
    }

    const formValues = new FormValues({
      studentID,
      formID,
      certificateID,
      certificateRequestID,
      dynamicFields: dynamicFieldsArray,
    });

    await formValues.save();

    res.status(201).json({ message: "Input values saved successfully" });
  } catch (error) {
    console.error("Error saving input values:", error);
    res.status(500).json({ error: "An error occurred while saving input values" });
  }
});



const getFormValuesByStudentAndCertificateID = asyncHandler(async (req, res) => {
  try {
    const studentID = req.params.studentID; 
    const certificateID = req.params.certificateID;
    const certificateRequestID = req.params.certificateRequestID; 

    const formValues = await FormValues.findOne({
      studentID,
      certificateID,
      certificateRequestID,
    });

    res.status(200).json(formValues);
  } catch (error) {
    console.error("Error fetching form values by studentID and certificateID:", error);
    res.status(500).json({ error: "An error occurred while fetching form values" });
  }
});

module.exports = {
  storeFormValues,getFormValuesByStudentAndCertificateID
};
