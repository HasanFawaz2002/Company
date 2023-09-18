const express = require("express");
const asyncHandler = require("express-async-handler");
const {storeFormValues} = require("../controllers/FormValuesController");
const verify = require('../Controllers/verifytoken');

const router = express.Router();

// Create a route handler to store input values
router.post(
  "/store-values/:formID", verify ,storeFormValues
);

module.exports = router;
