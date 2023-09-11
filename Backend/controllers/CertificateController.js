const Certificate = require('../models/certificate');
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

// Create a new certificate (requires a valid token with institutionID)
const createCertificate = async (req, res) => {
  try {
    const { name, description } = req.body;
    const institutionID = req.user.institution.id;

    // Check if req.file exists (uploaded image)
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const certificate = new Certificate({
      name,
      description,
      image: req.file.filename, // Save the filename in the database
      institutionID,
    });

    await certificate.save();

    res.status(201).json({ certificate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a list of certificates for an institution (requires a valid token with institutionID)
const getCertificates = async (req, res) => {
  try {
    // Extract the institutionID from the token
    
    const institutionID = req.user.institution.id;

    const certificates = await Certificate.find({ institutionID });

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a certificate by ID (requires a valid token with institutionID)
const updateCertificateById = async (req, res) => {
  try {
    const certificateID = req.params.certificateID;
    const { name, description, image } = req.body;

    // Extract the institutionID from the token
    const institutionID = req.user.institution.id;


    // Check if the certificate with the given ID exists and belongs to the institution
    const certificate = await Certificate.findOne({ _id: certificateID, institutionID });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Update the certificate's data
    certificate.name = name;
    certificate.description = description;
    certificate.image = image;

    await certificate.save();

    res.status(200).json({ certificate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a certificate by ID (requires a valid token with institutionID)
const deleteCertificateById = async (req, res) => {
  try {
    const certificateID = req.params.certificateID;

    // Extract the institutionID from the token
    const institutionID = req.user.institution.id;


    // Check if the certificate with the given ID exists and belongs to the institution
    const certificate = await Certificate.findOne({ _id: certificateID, institutionID });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Delete the certificate
    await Certificate.deleteOne({ _id: certificateID });

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createCertificate,
  getCertificates,
  updateCertificateById,
  deleteCertificateById,
  upload
};
