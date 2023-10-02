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
  
      const relativeImagePath = sharedCertificate.qrcode;
  
      const absoluteImagePath = path.join(uploadPath, relativeImagePath);
  
      if (!fs.existsSync(absoluteImagePath)) {
        return res.status(404).json({ error: 'File not found.', imagePath: absoluteImagePath });
      }
  
      res.sendFile(absoluteImagePath);
    } catch (err) {
      console.error('Error retrieving shared certificate photo:', err);
  
      res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
    }
  };
  

  const createSharedCertificate = async (req, res) => {
    try {
        const studentID = req.user.user.id;
        const { subscriberID } = req.params;
        const { certificateRequestID, certificateUploadID, qrUrl } = req.body;

        const existingSharedCertificate = await SharedCertificate.findOne({
            subscriberID,
            certificateRequestID,
            certificateUploadID,
        });

        if (existingSharedCertificate) {
            
            return res.status(400).json({ error: 'Certificate already shared to the same subscription' });
        }

        const qrcode = req.file ? req.file.filename : null;

       
        const sharedCertificate = new SharedCertificate({
            subscriberID,
            certificateRequestID,
            certificateUploadID,
            studentID,
            qrUrl,
            qrcode: qrcode,
        });

       
        await sharedCertificate.save();

        res.status(200).json({ message: 'Shared certificate created successfully', sharedCertificate });
    } catch (error) {
        console.error('Error creating shared certificate:', error);
        res.status(500).json({ error: 'Error creating shared certificate', errorMessage: error.message });
    }
};

const updateQrcode = async (req, res) => {
  const { qrUrl } = req.body;
  const sharedCertificateID = req.params.sharedCertificateID;

 
  let qrCodeFilename = null;
  if (req.file) {
    qrCodeFilename = req.file.filename;
  }

  try {
    const sharedCertificate = await SharedCertificate.findById(sharedCertificateID);

    if (!sharedCertificate) {
      return res.status(404).json({ error: "Shared certificate not found" });
    }

    if (qrCodeFilename) {
      sharedCertificate.qrcode = qrCodeFilename;
    }

    if (qrUrl) {
      sharedCertificate.qrUrl = qrUrl;
    }

    const updatedQrcode = await sharedCertificate.save();

    res.status(200).json(updatedQrcode);
  } catch (error) {
    console.error("Qrcode update failed:", error);
    res.status(500).json({ error: "Qrcode update failed" });
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
          populate:[ 
            {path: 'institutionID' },
            {path: 'studentID' }
          ],
        })
        .sort({ createdAt: +1 })
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
  

  const getSharedCertificateByID = async (req, res) => {
    const sharedCertificateID = req.params.sharedCertificateID;
  
    try {
      const sharedCertificate = await SharedCertificate.findById(sharedCertificateID)
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
          populate: [
            { path: 'institutionID' },
            { path: 'studentID' },
          ],
        })
        .exec();
  
      if (!sharedCertificate) {
        return res.status(404).json({ message: 'Shared certificate not found.' });
      }
  
      res.status(200).json(sharedCertificate);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  module.exports = { createSharedCertificate,getSharedCertificatePhoto,upload,updateQrcode,getSharedCertificateBySubscriber, getSharedCertificateByID};
  
