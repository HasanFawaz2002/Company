const asyncHandler = require("express-async-handler");
const FormValues = require("../models/formValues");

const storeFormValues = asyncHandler(async (req, res) => {
  try {
   
    const studentID = req.user.user.id;

    const formID = req.params.formID;

    const {  ...dynamicInputData } = req.body;

    const dynamicFieldsObject = {
     
      ...dynamicInputData
    };

    const formValues = new FormValues({
      studentID,
      formID,
      dynamicFields: dynamicFieldsObject
    });

    await formValues.save();

    res.status(201).json({ message: "Input values saved successfully" });
  } catch (error) {
    console.error("Error saving input values:", error);
    res.status(500).json({ error: "An error occurred while saving input values" });
  }
});

module.exports = {
  storeFormValues,
};
