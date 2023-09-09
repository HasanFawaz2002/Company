const {Router} = require('express');
const {
      createCertificateRequest,getCertificateRequestsByUser,deleteCertificateRequest,getCertificateRequestsByInstitution,
      updateCertificateStatusToVerified,updateCertificateStatusToRejected,
      getPendingCertificateRequestsCount,getVerifiedCertificateRequestsCount,getRejectedCertificateRequestsCount,getCertificateCount
      } 
      = require('../controllers/CertificateRequest');

const verify = require('../Controllers/verifytoken');
const router = Router();

router.post('/createCertificateRequest/:institutionID/:formID/:certificateID',verify, createCertificateRequest);
router.get('/getCertificateRequestsByUser',verify, getCertificateRequestsByUser);
router.delete('/deleteCertificateRequest/:requestID',verify, deleteCertificateRequest);

router.get('/certificateRequestsByInstitution', verify, getCertificateRequestsByInstitution);
router.put('/updateCertificateStatusToVerified/:requestID', verify, updateCertificateStatusToVerified);
router.put('/updateCertificateStatusToRejected/:requestID', verify, updateCertificateStatusToRejected);


router.get('/getPendingCertificateRequestsCount', verify, getPendingCertificateRequestsCount);
router.get('/getVerifiedCertificateRequestsCount', verify, getVerifiedCertificateRequestsCount);
router.get('/getRejectedCertificateRequestsCount', verify, getRejectedCertificateRequestsCount);
router.get('/getCertificateCount', verify, getCertificateCount);





module.exports = router;