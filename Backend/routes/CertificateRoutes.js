const {Router} = require('express');
const {createCertificate,
  getCertificates,
  updateCertificateById,
  deleteCertificateById,
  countTotalCertificates,
  getCertificatePhoto,
upload} = require('../controllers/CertificateController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/createCertificate',verify,upload.single('image'), createCertificate);
router.get('/getCertificates',verify, getCertificates);
router.delete('/deleteCertificateById/:certificateID',verify, deleteCertificateById);
router.put('/updateCertificateById/:certificateID',verify, updateCertificateById);
router.get('/countTotalCertificates',verify,countTotalCertificates);

//Get User  Photo
router.get("/getCertificatePhoto/:certificatePhotoID/photo", getCertificatePhoto);

module.exports = router;