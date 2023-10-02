const Certificate = require('../models/certificate');
const path = require('path');
const multer = require ('multer');
const fs = require('fs');
const CertificateRequest = require('../models/certificateRequest');
const CertificateUpload = require('../models/certificateUpload');
const Student = require('../models/user');


const uploadPath = path.join(__dirname, '..', 'server', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      console.log('Uploading files ...');
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath); 
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

const getCertificatePhoto = async (req, res) => {
  try {
    const certificatePhoto = await Certificate.findById(req.params.certificatePhotoID);
    if (!certificatePhoto) {
      return res.status(404).json({ error: 'certificatePhoto not found.' });
    }

    const relativeImagePath = certificatePhoto.image;

    const absoluteImagePath = path.join(uploadPath, relativeImagePath);

    
    if (!fs.existsSync(absoluteImagePath)) {
      return res.status(404).json({ error: 'File not found.', imagePath: absoluteImagePath });
    }

    
    res.sendFile(absoluteImagePath);
  } catch (err) {
    
    console.error('Error retrieving certificateUpload photo:', err);

    
    res.status(500).json({ error: 'Internal Server Error', errorMessage: err.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { name, description } = req.body;
    const institutionID = req.user.institution.id;

    
    if (!req.file) {
      console.log('No file uploaded'); 
      return res.status(400).json({ error: 'Image file is required' });
    }

    console.log('Received file:', req.file);

    const certificate = new Certificate({
      name,
      description,
      image: req.file.filename, 
      institutionID,
    });

    console.log('Certificate data:', certificate); 

    await certificate.save();

    console.log('Certificate saved successfully'); 

    res.status(201).json({ certificate });
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getCertificates = async (req, res) => {
  try {
    
    
    const institutionID = req.user.institution.id;

    const certificates = await Certificate.find({ institutionID });

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getCertificatesbyInstitution = async (req, res) => {
  try {
   
    
    const institutionID = req.params.institutionID;

    const certificates = await Certificate.find({ institutionID });

    res.status(200).json({ certificates });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateCertificateById = async (req, res) => {
  try {
    const certificateID = req.params.certificateID;
    const { name, description, image } = req.body;

    const institutionID = req.user.institution.id;


    const certificate = await Certificate.findOne({ _id: certificateID, institutionID });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    certificate.name = name;
    certificate.description = description;
    certificate.image = image;

    await certificate.save();

    res.status(200).json({ certificate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCertificateById = async (req, res) => {
  try {
    const certificateID = req.params.certificateID;

    const institutionID = req.user.institution.id;


    const certificate = await Certificate.findOne({ _id: certificateID, institutionID });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await Certificate.deleteOne({ _id: certificateID });

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const countTotalCertificates = async (req, res) => {
  try {
    const institutionID = req.user.institution.id;

    const totalCertificates = await Certificate.countDocuments({ institutionID });

    res.status(200).json({ totalCertificates });
  } catch (error) {
    console.error('Error counting total certificates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const calculateAverageCertificates = async (req, res) => {
  try {
    const institutionID = req.user.institution.id;

    const certificatesForInstitution = await Certificate.countDocuments({ institutionID });

    const totalCertificates = await Certificate.countDocuments();

    if (totalCertificates === 0) {
      return res.status(200).json({ average: 0 });
    }

    const average = ((certificatesForInstitution / totalCertificates) * 100).toFixed(1);

    res.status(200).json({ average: parseFloat(average) }); 

  } catch (error) {
    console.error('Error calculating average certificates:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const countTotalCertificatesForAllInstitutions = async (req, res) => {
  try {
    
    const totalCertificates = await Certificate.countDocuments();

    res.status(200).json({ totalCertificates });
  } catch (error) {
    console.error('Error counting total certificates for all institutions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const getStudentCountsForInstitution = async (req, res) => {
  try {
    const institutionID = req.user.institution.id;

    const requestedStudents = await CertificateRequest.distinct('studentID', {
      institutionID: institutionID,
    });

    const uploadedStudents = await CertificateUpload.distinct('studentID', {
      institutionID: institutionID,
      studentID: { $nin: requestedStudents }, 
    });

    const totalStudentCount = requestedStudents.length + uploadedStudents.length;

    res.status(200).json({ totalStudentCount });
  } catch (error) {
    console.error('Error counting total students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getStudentAverageForInstitution = async (req, res) => {
  try {
    const institutionID = req.user.institution.id;

    const requestedStudents = await CertificateRequest.distinct('studentID', {
      institutionID: institutionID,
    });

    const uploadedStudents = await CertificateUpload.distinct('studentID', {
      institutionID: institutionID,
      studentID: { $nin: requestedStudents },
    });

    const totalStudentCountForInstitution = requestedStudents.length + uploadedStudents.length;

    const totalStudentsInSystem = await Student.countDocuments();

    if (totalStudentsInSystem === 0) {
      return res.status(200).json({ average: 0 });
    }

   
    const average = ((totalStudentCountForInstitution / totalStudentsInSystem) * 100).toFixed(1);

    res.status(200).json({ average });
  } catch (error) {
    console.error('Error calculating average students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};








module.exports = {
  countTotalCertificates,
  createCertificate,
  getCertificates,
  updateCertificateById,
  deleteCertificateById,
  upload,
  getCertificatePhoto,
  getCertificatesbyInstitution,
  getStudentCountsForInstitution,
  countTotalCertificatesForAllInstitutions,
  calculateAverageCertificates,
  getStudentAverageForInstitution
};
