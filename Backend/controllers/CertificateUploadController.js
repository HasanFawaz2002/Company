// const asyncHandler = require("express-async-handler");
const CertificateUpload = require("../models/certificateUpload");
const path = require('path');
const multer = require ('multer');
const asyncHandler = require("express-async-handler");


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
// Create a new certificate upload
const createCertificateUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Certificate file is missing.' });
    }
    const studentID = req.user.user.id;

    // Get the institution ID from the request parameters
    const { institutionID } = req.params;
    const certificateFile = req.file;
    const certificateUpload = new CertificateUpload({
      studentID,
      institutionID,
      name: req.body.name,
      description: req.body.description,
      certificateFile: certificateFile.path,
    });
    // const certificateUpload = new CertificateUpload(req.body);
    await certificateUpload.save();
    res.status(201).json(certificateUpload);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a list of all certificate uploads for a specific institution
const getCertificateUploadsByInstitution = asyncHandler(async (req, res) => {
  try {
    // Extract the institution ID from the JWT token
    const institutionIDFromToken = req.user.institution.id;

    // Find certificate uploads that match the institution ID
    const certificateUploads = await CertificateUpload.find({
      institutionID: institutionIDFromToken,
    });

    res.status(200).json({
      message: "Certificate uploads retrieved successfully",
      certificateUploads,
    });
  } catch (error) {
    console.error("Error retrieving certificate uploads:", error);
    res.status(500).json({
      message: "Error retrieving certificate uploads",
      error: error.message,
    });
  }
});



// Get a single certificate upload by ID
const getCertificateUploadById = async (req, res) => {
  try {
    const certificateUpload = await CertificateUpload.findById(req.params.id);
    if (!certificateUpload) {
      return res.status(404).json({ error: 'Certificate upload not found' });
    }
    res.json(certificateUpload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a certificate upload by ID
const updateCertificateUploadById = async (req, res) => {
  try {
    const certificateUpload = await CertificateUpload.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!certificateUpload) {
      return res.status(404).json({ error: 'Certificate upload not found' });
    }
    res.json(certificateUpload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a certificate upload by ID
const deleteCertificateUploadById = async (req, res) => {
  try {
    const certificateUpload = await CertificateUpload.findByIdAndRemove(
      req.params.id
    );
    if (!certificateUpload) {
      return res.status(404).json({ error: 'Certificate upload not found' });
    }
    res.json({ message: 'Certificate upload deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCertificateUpload,
  getCertificateUploadsByInstitution,
  getCertificateUploadById,
  updateCertificateUploadById,
  deleteCertificateUploadById,
  upload
};

