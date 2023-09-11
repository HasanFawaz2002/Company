const {Router} = require('express');
const {registerUser,upload, loginUser,forgot,reset} = require('../controllers/AuthController');



const router = Router();

router.post('/register', upload.fields([{ name: 'profilePicture' }, { name: 'ID' }]), registerUser);
router.post('/login', loginUser);
router.post('/forgot-password',forgot);
router.post('/reset-password/:id/:token',reset);


module.exports = router;