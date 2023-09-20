const {Router} = require('express');
const {createsubscription,getAllSubscriptions,updateSubscriptionStatusToVerified,loginSubscription,getTotalSubscribers} = require('../controllers/SubscriptionController');
const verify = require('../Controllers/verifytoken');




const router = Router();

router.post('/createsubscription', createsubscription);
router.get('/getAllSubscriptions', getAllSubscriptions);
router.put('/updateSubscriptionStatusToVerified/:subscriptionID', updateSubscriptionStatusToVerified);
router.post('/loginSubscription', loginSubscription);
router.get('/countTotalSubscribers', getTotalSubscribers);


module.exports = router;