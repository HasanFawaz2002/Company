const asyncHandler = require("express-async-handler");
const FormValues = require("../models/formValues");

// Create a controller function to store input values
const storeFormValues = asyncHandler(async (req, res) => {
  try {
    // Get the studentID from the token (assuming it's available in req.user.user.id)
    const studentID = req.user.user.id;

    // Get the formID from the route parameter
    const formID = req.params.formID;

    // Get the dynamic input values from the request body (assuming they are sent as JSON)
    const {  ...dynamicInputData } = req.body;

    // Create an object to hold dynamic fields
    const dynamicFieldsObject = {
     
      ...dynamicInputData
    };

    // Create a new FormValues document
    const formValues = new FormValues({
      studentID,
      formID,
      // Set dynamic fields within the dynamicFields property
      dynamicFields: dynamicFieldsObject
    });

    // Save the document to the database
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
