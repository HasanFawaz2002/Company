const express = require('express');
const router = express.Router();
const { createSharedCertificate, getSharedCertificatePhoto,upload,getSharedCertificateBySubscriber } = require('../controllers/SharedCertificateController');

// Create a new shared certificate
router.post('/create/:subscriberID',upload.single('qrcode'), createSharedCertificate);

// Get shared certificate photo by ID
router.get('/photo/:SharedcertificatePhotoID', getSharedCertificatePhoto);
router.get('/getSharedCertificateBySubscriber/:subscriberID', getSharedCertificateBySubscriber);


module.exports = router;
