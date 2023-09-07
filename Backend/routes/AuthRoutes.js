const {Router} = require('express');
const {registerUser,upload, loginUser,} = require('../controllers/AuthController');



const router = Router();

router.post('/register', upload.fields([{ name: 'profilePicture' }, { name: 'ID' }]), registerUser);
router.post('/login', loginUser);


module.exports = router;