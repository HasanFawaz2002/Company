const SharedCertificate = require('../models/sharedCertificate');
const path = require('path');
const multer = require ('multer');
const fs = require('fs');


const uploadPath = path.join(__dirname, '..', 'server', 'uploads');

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

const getSharedCertificatePhoto = async (req, res) => {
    try {
      const sharedCertificate = await SharedCertificate.findById(req.params.SharedcertificatePhotoID);
      if (!sharedCertificate) {
        return res.status(404).json({ error: 'Certificate not found.' });
      }
  
      // Use the imagePath directly from the sharedCertificate instance
      const relativeImagePath = sharedCertificate.qrcode;
  
      // Get the absolute path to the image file
      const absoluteImagePath = path.join(uploadPath, relativeImagePath);
  
      // Check if the file exists
      if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ error: 'File not found.', imagePath: absoluteImagePath });
      }
  
      // Send the certificate's photo as a response
      res.sendFile(absoluteImagePath);
    } catch (err) {
      // Log the error including the error message and stack trace
      console.error('Error retrieving shared certificate photo:', err);
  
      // Respond with a more detailed error message
      res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
    }
  };
  

  // Create a shared certificate
const createSharedCertificate = async (req, res) => {
    try {
        // Extract the subscriberID from the URL parameters
        const { subscriberID } = req.params;
        const { certificateRequestID, certificateUploadID } = req.body;

       

            // Create the shared certificate record
            const sharedCertificate = new SharedCertificate({
                subscriberID,
                certificateRequestID,
                certificateUploadID,
                qrcode: req.file.filename,
            });

            // Save the shared certificate record to the database
            await sharedCertificate.save();

            res.status(201).json({ message: 'Shared certificate created successfully', sharedCertificate });
    } catch (error) {
        console.error('Error creating shared certificate:', error);
        res.status(500).json({ error: 'Error creating shared certificate', errorMessage: error.message });
    }
};


const getSharedCertificateBySubscriber = async (req, res) => {
    const subscriberID = req.params.subscriberID; 
  
    try {
      const sharedCertificate = await SharedCertificate.find({ subscriberID })
        .populate({
          path: 'certificateRequestID',
          populate: [
            { path: 'studentID' }, 
            { path: 'certificateID' }, 
            { path: 'institutionID' },
          ],
        })
        .populate({
          path: 'certificateUploadID',
          populate: {
            path: 'institutionID', 
          },
        })
        .exec();
  
      if (!sharedCertificate) {
        return res.status(404).json({ message: 'Shared certificate not found for the subscriber.' });
      }
  
      res.status(200).json(sharedCertificate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  
  module.exports = { createSharedCertificate,getSharedCertificatePhoto,upload,getSharedCertificateBySubscriber};
  
