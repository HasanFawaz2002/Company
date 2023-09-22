const {Router} = require('express');
const {createInstitution,loginInstitution,deleteInstitutionById,updateInstitutionById,getAllInstitutions,getInstitutionById,
    updateInstitutionPasswordById,getLastThreeInstitutions,getTotalInstitutions
} = require('../controllers/InstitutionController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/createInstitution', createInstitution);
router.post('/loginInstitution', loginInstitution);
router.delete('/deleteInstitution/:institutionID', deleteInstitutionById);
router.put('/updateInstitution/:institutionID', updateInstitutionById);
router.get('/getAllInstitutions',getAllInstitutions)
router.get('/getInstitution',verify,getInstitutionById)
router.put('/updateInstitutionPasswordById',verify,updateInstitutionPasswordById);
router.get('/getLastThreeInstitutions',getLastThreeInstitutions);
router.get('/getTotalInstitutions',getTotalInstitutions)

module.exports = router;