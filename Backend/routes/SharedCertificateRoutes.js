const express = require('express');
const router = express.Router();
const { createSharedCertificate, getSharedCertificatePhoto,upload,getSharedCertificateBySubscriber, getSharedCertificateByID } = require('../controllers/SharedCertificateController');
const verify = require('../Controllers/verifytoken');

// Create a new shared certificate
router.post('/create/:subscriberID',upload.single('qrcode'),verify, createSharedCertificate);

// Get shared certificate photo by ID
router.get('/photo/:SharedcertificatePhotoID', getSharedCertificatePhoto);
router.get('/getSharedCertificateBySubscriber/:subscriberID', getSharedCertificateBySubscriber);
router.get('/getSharedCertificateById/:sharedCertificateID', getSharedCertificateByID);


module.exports = router;
