const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, checkConnection } = require("./db");
const insertEvent = require("./InstertEvent");
const registrationRoute = require("./routes/RegistrationRoute");
const eventRoute = require("./routes/EventRoute");
const paymentRoute = require("./routes/PaymentRoute");
const path = require("path");

const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

// app.use(cors({ origin: "http://localhost:5500", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).send("Server up and running");
});

app.use("/", express.static(__dirname));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"));
});

connectDB();
checkConnection();
// insertEvent();

const apiBasePath = "/api/v1";
app.use(`${apiBasePath}/image`, express.static(path.join(__dirname, "Events")));

// Logging middleware
// app.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.url}`);
//   next();
// });

app.use(`${apiBasePath}/registration`, registrationRoute);
app.use(`${apiBasePath}/event`, eventRoute);
app.use(`${apiBasePath}/payment`, paymentRoute);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
