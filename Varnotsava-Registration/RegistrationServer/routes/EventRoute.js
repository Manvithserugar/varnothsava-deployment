const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");

router.get("/", EventController.fetchEvents);

module.exports = router;
