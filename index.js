require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require("firebase-admin");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  jwt_secret_key: "some_key_id",
  jwt_secret: process.env.JWT_SECRET.replace(/\\n/g, '\n'),
  mongo_uri: process.env.MONGO_URI,
  client_id: "some_client_id",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk"
};

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

app.get("/", (req, res) => res.send("BetMaster 254 API Running"));

//Routes
app.use("/api/matches", require("./routes/matches"));
app.use("/api/wallet", require("./routes/wallet"));
app.use("/api/bets", require("./routes/bets"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
