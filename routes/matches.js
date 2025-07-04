const express = require("express");
const router = express.Router();

// Mock data - replace with Cloudflare Worker proxy
router.get("/", (req, res) => {
  res.json([
    {
      league: "EPL",
      home: "Arsenal",
      away: "Man City",
      odds: { home: 2.4, draw: 3.1, away: 2.7 }
    },
    {
      league: "KPL",
      home: "Gor Mahia",
      away: "AFC",
      odds: { home: 2.0, draw: 2.8, away: 3.3 }
    }
  ]);
});

module.exports = router;