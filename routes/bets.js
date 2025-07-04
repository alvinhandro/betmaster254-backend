const express = require("express");
const router = express.Router();

// Simple bets mock
router.get("/", (req, res) => {
  res.json([
    { match: "Gor Mahia vs AFC", bet: "Home", amount: 500, status: "Won" }
  ]);
});

router.post("/", (req, res) => {
  res.json({ message: "Bet placed successfully", bet: req.body });
});

module.exports = router;