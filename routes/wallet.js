const express = require("express");
const router = express.Router();

// Mock wallet logic
router.get("/", (req, res) => {
  res.json({ balance: 1500 });
});

router.post("/deposit", (req, res) => {
  res.json({ status: "success", message: "KES 500 deposited" });
});

router.post("/withdraw", (req, res) => {
  res.json({ status: "success", message: "KES 300 withdrawn" });
});

module.exports = router;