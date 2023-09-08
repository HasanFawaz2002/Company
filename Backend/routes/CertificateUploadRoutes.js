const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const CertificateUploadController = require('../controllers/CertificateUploadController');
const verify = require('../Controllers/verifytoken');

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define your destination folder here
    // For example, if you want to save uploads in the 'uploads/' folder:
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename logic here, for example:
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); // Create a multer instance with the defined storage

// Create a new certificate upload
router.post('/certificateUploadRoute/:institutionID', verify, upload.single('certificateFile'), CertificateUploadController.createCertificateUpload);

// Get a list of all certificate uploads
router.get('/certificateUploadRoute',verify, CertificateUploadController.getCertificateUploadsByInstitution);

// Get a single certificate upload by ID
router.get('/certificateUploadRoute/:id', CertificateUploadController.getCertificateUploadById);

// Update a certificate upload by ID
router.put('/certificateUploadRoute/:id', CertificateUploadController.updateCertificateUploadById);

// Delete a certificate upload by ID
router.delete('/certificateUploadRoute/:id', CertificateUploadController.deleteCertificateUploadById);

module.exports = router;
