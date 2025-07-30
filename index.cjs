const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const VERIFICATION_TOKEN = "eBay_PrimeDeport24_SecureClose_WirMachenDenLadenDicht";
const ENDPOINT_URL = "https://ebay-webhook-endpoint.onrender.com/"; // exakt wie bei eBay eingetragen

app.get("/", (req, res) => {
  const challengeCode = req.query.challenge_code;

  if (!challengeCode) {
    return res.status(400).json({ error: "Missing challenge_code" });
  }

  const hash = crypto.createHash("sha256");
  hash.update(challengeCode);
  hash.update(VERIFICATION_TOKEN);
  hash.update(ENDPOINT_URL);
  const responseHash = hash.digest("hex");

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ challengeResponse: responseHash });
});

app.post("/", (req, res) => {
  res.status(200).json({ message: "POST-Empfang ok." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Webhook läuft auf Port ${PORT}`);
});
