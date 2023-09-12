const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require('path');
const multer = require ('multer');
const fs = require('fs');

// Construct the full path to the uploads directory
const uploadPath = path.join(__dirname, '..', 'server', 'uploads', 'usersImages');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log('Uploading files ...');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath); // Remove the extra concatenation here
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, `${Date.now()}-${file.originalname}`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});

const upload = multer({ storage: storage });

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, bio, location } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ error: "All fields are mandatory!" });
      return;
    }

    const emailUser = await User.findOne({ email });

    if (emailUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    

    // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);
    const username = firstname + " " + lastname;

    // Check if profilePicture is provided
    let profilePictureFilename = null; // Default value if not provided
    if (req.files.profilePicture && req.files.profilePicture[0]) {
      profilePictureFilename = req.files.profilePicture[0].filename;
    }

    // Create the user document with optional fields
    const { ID } = req.files;
    const user = await User.create({
      ID: ID[0].filename,
      username,
      firstname,
      lastname,
      email,
      password:hashedPassword,
      profilePicture: profilePictureFilename, 
      bio, 
      location, 
    });

    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ error: "User data is not valid" });
    } 
  } catch (error) {
    console.error("Registration failed:", error);
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
   
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user._id,
            role: user.role
          },
        },
        process.env.ACCESS,
        { expiresIn: "1d" }
      );
      res.status(200).json({ user, accessToken });
    
  } else {
    res.status(401).json({ error: "Email or Password is not valid" });
  }
});





module.exports = { registerUser, loginUser, upload};