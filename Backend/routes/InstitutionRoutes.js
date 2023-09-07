const {Router} = require('express');
const {createInstitution,loginInstitution,deleteInstitutionById,updateInstitutionById,getAllInstitutions} = require('../controllers/InstitutionController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/createInstitution', createInstitution);
router.post('/loginInstitution', loginInstitution);
router.delete('/deleteInstitution/:institutionID', deleteInstitutionById);
router.put('/updateInstitution/:institutionID', updateInstitutionById);
router.get('/getAllInstitutions',getAllInstitutions)

module.exports = router;