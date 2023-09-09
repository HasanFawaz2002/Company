const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Institution = require("../models/institution");


// Function to generate a random password of a given length
function generateRandomPassword(minLength, maxLength) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// Create an institution with an auto-generated password
const createInstitution = asyncHandler(async (req, res) => {
    try {
        // Generate a random password with a minimum length of 6 characters
        const password = generateRandomPassword(6, 12);

        // Hash the generated password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create the institution with the generated password
        const institution = await Institution.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            // password: hashedPassword, // Store the hashed password
            password
        });

        // Return the institution data or a success message
        res.status(201).json({
            message: "Institution created successfully",
            institution,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating institution", error });
    }
});


const loginInstitution = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const institution = await Institution.findOne({ email });
    //compare password with hashedpassword
    if (institution &&   institution.password){//await bcrypt.compare(password, institution.password)) {
      const accessToken = jwt.sign(
        {
            institution: {
            email: institution.email,
            id: institution._id,
            role:institution.role
          },
        },
        process.env.ACCESS,
        { expiresIn: "1d" }
      );
      res.status(200).json({ institution,accessToken });
    } else {
      res.status(401).json({ error: "Email or Password is not valid" });
    }
  });

  // Delete an institution by ID
const deleteInstitutionById = asyncHandler(async (req, res) => {
  try {
      const institutionID = req.params.institutionID;

      // Check if the institution with the given ID exists
      const institution = await Institution.findById(institutionID);

      if (!institution) {
          return res.status(404).json({ message: "Institution not found" });
      }

      // Delete the institution using deleteOne
      await Institution.deleteOne({ _id: institutionID });

      res.status(200).json({ message: "Institution deleted successfully" });
  } catch (error) {
      console.error("Error deleting institution:", error);
      res.status(500).json({ message: "Error deleting institution", error: error.message });
  }
});


// Update an institution by ID
const updateInstitutionById = asyncHandler(async (req, res) => {
  try {
      const institutionID = req.params.institutionID;
      const updateData = req.body; // Data to update the institution

      // Check if the institution with the given ID exists
      const institution = await Institution.findById(institutionID);

      if (!institution) {
          return res.status(404).json({ message: "Institution not found" });
      }

      // Check if the updateData contains a new password
      if (updateData.password) {
          // Hash the new password
        //   const hashedPassword = await bcrypt.hash(updateData.password, 10);
        //   updateData.password = hashedPassword;
      }

      // Update the institution's data
      Object.assign(institution, updateData);

      // Save the updated institution to the database
      await institution.save();

      res.status(200).json({ message: "Institution updated successfully", institution });
  } catch (error) {
      console.error("Error updating institution:", error);
      res.status(500).json({ message: "Error updating institution", error: error.message });
  }
});

// Get all institutions
const getAllInstitutions = asyncHandler(async (req, res) => {
  try {
      const institutions = await Institution.find();

      if (!institutions || institutions.length === 0) {
          return res.status(404).json({ message: "No institutions found" });
      }

      res.status(200).json({
          message: "Institutions retrieved successfully",
          institutions,
      });
  } catch (error) {
      console.error("Error retrieving institutions:", error);
      res.status(500).json({ message: "Error retrieving institutions", error: error.message });
  }
});




module.exports = {
    createInstitution,loginInstitution,deleteInstitutionById,updateInstitutionById,getAllInstitutions
};
