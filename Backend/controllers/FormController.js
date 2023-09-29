const asyncHandler = require("express-async-handler");
const CustomizableForm = require("../models/form");

// Add a customizable form
const addCustomizableForm = asyncHandler(async (req, res) => {
    try {
        const institutionID = req.user.institution.id;
        const { formName, fields } = req.body;

        
        const existingForm = await CustomizableForm.findOne({ institutionID });

        if (existingForm) {
            return res.status(400).json({ message: "An existing form already exists for this institution" });
        }

        const customizableForm = await CustomizableForm.create({
            formName,
            institutionID,
            fields,
        });

        res.status(201).json({
            message: "Customizable form added successfully",
            customizableForm,
        });
    } catch (error) {
        console.error("Error adding customizable form:", error);
        res.status(500).json({ message: "Error adding customizable form", error: error.message });
    }
});


const getCustomizableFormByInstitution = asyncHandler(async (req, res) => {
    try {
        const institutionID = req.params.institutionID;

        const customizableForm = await CustomizableForm.findOne({ institutionID });

        if (!customizableForm) {
            return res.status(404).json({ message: "Customizable form not found for this institution" });
        }

        res.status(200).json({
            message: "Customizable form retrieved successfully",
            customizableForm,
        });
    } catch (error) {
        console.error("Error retrieving customizable form:", error);
        res.status(500).json({ message: "Error retrieving customizable form", error: error.message });
    }
});

const deleteCustomizableFormByInstitution = asyncHandler(async (req, res) => {
    try {
        const institutionID = req.user.institution.id;

        const deletedForm = await CustomizableForm.findOneAndDelete({ institutionID });

        if (!deletedForm) {
            return res.status(404).json({ message: "Customizable form not found for this institution" });
        }

        res.status(200).json({ message: "Customizable form deleted successfully", deletedForm });
    } catch (error) {
        console.error("Error deleting customizable form:", error);
        res.status(500).json({ message: "Error deleting customizable form", error: error.message });
    }
});


// Update the customizable form of the logged-in institution
const updateCustomizableFormByInstitution = asyncHandler(async (req, res) => {
    try {
        const institutionID = req.user.institution.id;
        const { formName, fields } = req.body;

        const updatedForm = await CustomizableForm.findOneAndUpdate(
            { institutionID },
            { formName, fields },
            { new: true } 
        );

        if (!updatedForm) {
            return res.status(404).json({ message: "Customizable form not found for this institution" });
        }

        res.status(200).json({ message: "Customizable form updated successfully", updatedForm });
    } catch (error) {
        console.error("Error updating customizable form:", error);
        res.status(500).json({ message: "Error updating customizable form", error: error.message });
    }
});

module.exports = {
    addCustomizableForm,getCustomizableFormByInstitution,deleteCustomizableFormByInstitution,updateCustomizableFormByInstitution
};
