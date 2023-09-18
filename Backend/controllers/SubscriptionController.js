const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Subscribtion = require('../models/subscription');
const cron = require('node-cron');
const nodeMailer = require('nodemailer');



// Schedule a cron job to check for expired subscriptions and update their status
cron.schedule('*/5 * * * *', async () => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Find subscriptions where the expirationTime is less than or equal to the current date
        const expiredSubscriptions = await Subscribtion.find({
            expirationTime: { $lte: currentDate },
            status: 'verified', // Assuming you have a 'status' field in your Subscription model
        });

        // Update the status of expired subscriptions to 'expired'
        await Promise.all(expiredSubscriptions.map(async (subscription) => {
            subscription.status = 'expired';
            await subscription.save();
        }));

        console.log('Expired subscriptions checked and updated.');
    } catch (error) {
        console.error('Error checking and updating expired subscriptions:', error);
    }
});

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

//Create Subscription
const createsubscription = asyncHandler(async (req, res) => {

    // Check if the email already exists in the database
    const existingSubscription = await Subscribtion.findOne({ email: req.body.email });

    if (existingSubscription) {
      // Send a specific error response for duplicate email
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    try {
        // Generate a random password with a minimum length of 6 characters
        const password = generateRandomPassword(6, 12);

        // Calculate the expiration time (1 year from now)
        const expirationTime = new Date();
        expirationTime.setFullYear(expirationTime.getFullYear() + 1);

        // Hash the generated password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the subscription with the generated password
        const subscription = await Subscribtion.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
            position: req.body.position,
            expirationTime: expirationTime, // Set the expiration time
        });

        // Check if the subscription was successfully created
        if (subscription) {
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: subscription.email,
                subject: 'Your Subscription Account Information',
                text: ` Your email: ${subscription.email} and password: ${password} for ${subscription.position}`
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.error(err);
                    res.status(400).json(err);
                } else {
                    console.log("Email sent: " + info.response);
                    res.status(201).json({
                        message: "Subscription created successfully",
                        subscription,
                    });
                }
            });
        } else {
            // Handle the case where subscription creation failed
            res.status(500).json({ message: "Error creating Subscription" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating Subscription", error });
    }
});





// Controller to get all subscriptions
const getAllSubscriptions = asyncHandler(async (req, res) => {
    try {
        // Find all subscriptions in the database
        const subscriptions = await Subscribtion.find();

        // Return the list of subscriptions
        res.status(200).json({
            message: "Subscriptions retrieved successfully",
            subscriptions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving subscriptions", error });
    }
});


// Controller to update the status of a subscription to 'verified'
const updateSubscriptionStatusToVerified = asyncHandler(async (req, res) => {
    try {
        const subscriptionID = req.params.subscriptionID; // Assuming the subscription ID is passed as a parameter

        // Find the subscription by its ID
        const subscription = await Subscribtion.findById(subscriptionID);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        // Update the status to 'verified'
        subscription.status = 'verified';

        // Renew the expiration time to one year from the current date
        const currentExpirationTime = new Date();
        currentExpirationTime.setFullYear(currentExpirationTime.getFullYear() + 1);
        subscription.expirationTime = currentExpirationTime;

        // Save the updated subscription
        await subscription.save();

        // Return the updated subscription
        res.status(200).json({
            message: "Subscription status updated to 'verified'",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating subscription status", error });
    }
});

const loginSubscription = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const subscribtion = await Subscribtion.findOne({ email });
    //compare password with hashedpassword
    if (subscribtion &&   await bcrypt.compare(password, subscribtion.password)) {
      const accessToken = jwt.sign(
        {
            subscription: {
            email: subscribtion.email,
            id: subscribtion._id,
            role: subscribtion.role
          },
        },
        process.env.ACCESS,
        { expiresIn: "1d" }
      );
      res.status(200).json({ subscribtion,accessToken });
    } else {
      res.status(401).json({ error: "Email or Password is not valid" });
    }
  });


module.exports = {
    createsubscription,getAllSubscriptions,updateSubscriptionStatusToVerified,loginSubscription
};
