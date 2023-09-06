const {Router} = require('express');
const {createInstitution,loginInstitution} = require('../controllers/InstitutionController');



const router = Router();

router.post('/createInstitution', createInstitution);
router.post('/loginInstitution', loginInstitution);


module.exports = router;