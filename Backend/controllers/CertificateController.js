const Certificate = require('../models/certificate');
const jwt = require('jsonwebtoken');

// Create a new certificate (requires a valid token with institutionID)
const createCertificate = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    
    // Extract the institutionID from the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS);
    const institutionID = decodedToken.institution.id;

    const certificate = new Certificate({
      name,
      description,
      image,
      institutionID,
    });

    await certificate.save();

    res.status(201).json({ certificate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a list of certificates (requires a valid token with institutionID)
const getCertificates = async (req, res) => {
  try {
    // Extract the institutionID from the token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS);
    const institutionID = decodedToken.institution.id;

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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS);
    const institutionID = decodedToken.institution.id;

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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS);
    const institutionID = decodedToken.institution.id;

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
};
