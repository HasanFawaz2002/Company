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
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the institution with the generated password
        const institution = await Institution.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
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
    if (institution && (await bcrypt.compare(password, institution.password))) {
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

module.exports = {
    createInstitution,loginInstitution
};
