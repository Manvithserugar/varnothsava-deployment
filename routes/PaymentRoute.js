const express = require("express");
const router = express.Router();
const sessionMiddleware = require("../services/sessionMiddleware");
const PaymentController = require("../controllers/PaymentController");
const upload = require("../services/fileUploadMiddleware");

router.post(
  "/offline",
  [sessionMiddleware],
  PaymentController.handleOfflinePayment
);

router.post(
  "/online",
  [sessionMiddleware, upload.single("file")],
  PaymentController.handleOnlinePayment
);

module.exports = router;
