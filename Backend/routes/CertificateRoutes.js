const {Router} = require('express');
const {createCertificate,
  getCertificates,
  updateCertificateById,
  deleteCertificateById,} = require('../controllers/CertificateController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/create', createCertificate);
router.get('/all', getCertificates);
router.delete('/:certificateID', deleteCertificateById);
router.put('/:certificateID', updateCertificateById);

module.exports = router;