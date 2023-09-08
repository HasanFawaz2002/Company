const {Router} = require('express');
const {createsubscription,getSubscriptionsByInstitution,getAllSubscriptions,updateSubscriptionStatusToVerified,loginSubscription} = require('../controllers/SubscriptionController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/createsubscription', createsubscription);
router.get('/getSubscriptionsByInstitution',verify, getSubscriptionsByInstitution);
router.get('/getAllSubscriptions', getAllSubscriptions);
router.put('/updateSubscriptionStatusToVerified/:subscriptionID', updateSubscriptionStatusToVerified);
router.post('/loginSubscription', loginSubscription);


module.exports = router;