const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
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

const forgot = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          role: user.role
        },
      },
      process.env.ACCESS,
      { expiresIn: '1d' }
    );

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password Link',
      text: `http://localhost:3000/reset_password/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send reset email' });
      } else {
        return res.status(200).json({ message: 'Reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const reset = asyncHandler(async (req, res) =>  {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token,process.env.ACCESS, (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})



module.exports = { registerUser, loginUser,upload,forgot,reset};
