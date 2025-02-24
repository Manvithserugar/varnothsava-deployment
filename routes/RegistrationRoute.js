const express = require("express");
const router = express.Router();
const registrationController = require('../controllers/RegistrationController')

router.post("/", registrationController.registerStudent);

module.exports = router;
