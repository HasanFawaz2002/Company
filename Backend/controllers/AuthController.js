const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, city, age, phonenumber } = req.body;

    if (!firstname || !lastname || !email || !password || !city || !age || !phonenumber) {
      res.status(400).json({ error: "All fields are mandatory!" });
      return;
    }

    const emailUser = await User.findOne({ email });
    const phoneUser = await User.findOne({ phonenumber });

    if (emailUser && phoneUser) {
      res.status(400).json({ error: "Email and phone number already registered" });
      return;
    } else if (emailUser) {
      res.status(400).json({ error: "User already registered with this email" });
      return;
    } else if (phoneUser) {
      res.status(400).json({ error: "User already registered with this phone number" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = firstname + " " + lastname;
    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ error: "User data is not valid" });
    }
  } catch (error) {
    console.error("Registration failed:", error);
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
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user._id,
          isAdmin:user.isAdmin
        },
      },
      process.env.ACCESS,
      { expiresIn: "1d" }
    );
    res.status(200).json({ user,accessToken });
  } else {
    res.status(401).json({ error: "Email or Password is not valid" });
  }
});





module.exports = { registerUser, loginUser};