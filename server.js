import express from "express";
import cors from "cors";
import { db, auth } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.send("BetMaster 254 Backend is live 🚀");
});

// Register (mock logic - real auth via Firebase client SDK)
app.post("/api/register", async (req, res) => {
  const { uid, fullName, email } = req.body;
  try {
    await db.collection("users").doc(uid).set({
      fullName,
      email,
      wallet: 0,
      createdAt: Date.now(),
    });
    res.status(201).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Wallet balance
app.get("/api/wallet/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) return res.status(404).send({ error: "User not found" });
    res.send({ wallet: doc.data().wallet });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Deposit (mock)
app.post("/api/deposit", async (req, res) => {
  const { uid, amount } = req.body;
  try {
    const ref = db.collection("users").doc(uid);
    await ref.update({ wallet: admin.firestore.FieldValue.increment(amount) });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));