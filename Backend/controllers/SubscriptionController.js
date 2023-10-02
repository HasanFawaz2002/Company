const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Subscribtion = require('../models/subscription');
const cron = require('node-cron');
const nodeMailer = require('nodemailer');




cron.schedule('*/5 * * * *', async () => {
    try {
       
        const currentDate = new Date();

        
        const expiredSubscriptions = await Subscribtion.find({
            expirationTime: { $lte: currentDate },
            status: 'verified', 
        });

       
        await Promise.all(expiredSubscriptions.map(async (subscription) => {
            subscription.status = 'expired';
            await subscription.save();
        }));

        console.log('Expired subscriptions checked and updated.');
    } catch (error) {
        console.error('Error checking and updating expired subscriptions:', error);
    }
});


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

   
    const existingSubscription = await Subscribtion.findOne({ email: req.body.email });

    if (existingSubscription) {
     
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    try {
        
        const password = generateRandomPassword(6, 12);

       
        const expirationTime = new Date();
        expirationTime.setFullYear(expirationTime.getFullYear() + 1);

       
        const hashedPassword = await bcrypt.hash(password, 10);

     
        const subscription = await Subscribtion.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword, 
            position: req.body.position,
            expirationTime: expirationTime, 
        });

        
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
        
        const subscriptions = await Subscribtion.find();

       
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
        const subscriptionID = req.params.subscriptionID; 

        
        const subscription = await Subscribtion.findById(subscriptionID);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

       
        subscription.status = 'verified';

        
        const currentExpirationTime = new Date();
        currentExpirationTime.setFullYear(currentExpirationTime.getFullYear() + 1);
        subscription.expirationTime = currentExpirationTime;

        
        await subscription.save();

        
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

    if (subscribtion && await bcrypt.compare(password, subscribtion.password)) {
      if (subscribtion.status === 'verified') {
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

        res.status(200).json({ subscribtion, accessToken });
      } else {
        res.status(401).json({ error: "Subscription is not verified" });
      }
    } else {
      res.status(401).json({ error: "Email or Password is not valid" });
    }
  });


  const countTotalSubscribers = async () => {
    try {
      
      const totalSubscribers = await Subscribtion.countDocuments();
  
      return totalSubscribers;
    } catch (error) {
      console.error('Error counting total subscribers:', error);
      return 0; 
    }
  };
  
  const getTotalSubscribers = asyncHandler(async (req, res) => {
    try {
     
      const totalSubscribers = await countTotalSubscribers();
  
      res.status(200).json({ total: totalSubscribers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving total subscribers', error });
    }
  });


  const getSubscriptionById = asyncHandler(async (req, res) => {
    try {
        const subscriptionID = req.user.subscription.id; 

       
        const subscription = await Subscribtion.findById(subscriptionID);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        res.status(200).json({
            message: "Subscription retrieved successfully",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving subscription", error });
    }
});


const updateSubscriptionPassword = asyncHandler(async (req, res) => {
    try {
        const subscriptionID = req.user.subscription.id; 
        const newPassword = req.body.password; 

        
        const subscription = await Subscribtion.findById(subscriptionID);

        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        
        const saltRounds = 10;

        if (!saltRounds) {
            return res.status(400).json({ message: "Salt rounds are required" });
        }

        const salt = await bcrypt.genSalt(saltRounds);

        if (!salt) {
            return res.status(500).json({ message: "Error generating salt" });
        }

        
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        if (!hashedNewPassword) {
            return res.status(500).json({ message: "Error hashing new password" });
        }

        
        subscription.password = hashedNewPassword;
        subscription.notified = true;


        
        await subscription.save();

        
        res.status(200).json({
            message: "Subscription password updated successfully",
            subscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating subscription password", error: error.message });
    }
});

const countVerifiedSubscriptions = async () => {
    try {
      
      const verifiedSubscriptions = await Subscribtion.countDocuments({ status: 'verified' });
  
      return verifiedSubscriptions;
    } catch (error) {
      console.error('Error counting verified subscriptions:', error);
      return 0; 
    }
  };

  const countExpiredSubscriptions = async () => {
    try {
     
      const expiredSubscriptions = await Subscribtion.countDocuments({ status: 'expired' });
  
      return expiredSubscriptions;
    } catch (error) {
      console.error('Error counting expired subscriptions:', error);
      return 0; 
    }
  };

  const getAverageVerifiedAndExpiredSubscribers = asyncHandler(async (req, res) => {
    try {
      
      const totalSubscribers = await countTotalSubscribers();
  
      
      const verifiedSubscribers = await countVerifiedSubscriptions();
  
     
      const expiredSubscribers = await countExpiredSubscriptions();
  
      const averageVerified = totalSubscribers > 0 ? ((verifiedSubscribers / totalSubscribers) * 100).toFixed(1) : 0;
      const averageExpired = totalSubscribers > 0 ? ((expiredSubscribers / totalSubscribers) * 100).toFixed(1) : 0;
  
      res.status(200).json({
        total: totalSubscribers,
        verified: verifiedSubscribers,
        expired: expiredSubscribers,
        averageVerified: averageVerified,
        averageExpired: averageExpired,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving total subscribers', error });
    }
  });
  




module.exports = {
    createsubscription,getSubscriptionById,updateSubscriptionPassword,getAllSubscriptions,updateSubscriptionStatusToVerified,loginSubscription,getTotalSubscribers,
    getAverageVerifiedAndExpiredSubscribers
};
