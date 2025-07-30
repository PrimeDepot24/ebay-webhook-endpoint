const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const VERIFICATION_TOKEN = "revel_webhook_token_2025_secure_hash_abcXYZ_001"; // <- ersetze durch deinen echten Token
const ENDPOINT_URL = "https://ebay-webhook-endpoint.onrender.com/"; // <- exakt so wie bei eBay eingetragen

app.post("/", (req, res) => {
  const challengeCode = req.query.challenge_code;

  if (!challengeCode) {
    return res.status(400).json({ error: "Missing challenge_code" });
  }

  const hash = crypto
    .createHash("sha256")
    .update(challengeCode + VERIFICATION_TOKEN + ENDPOINT_URL)
    .digest("hex");

  res.status(200).json({
    challengeResponse: hash,
  });
});

app.get("/", (req, res) => {
  res.send("✅ Webhook läuft – POST mit challenge_code erwartet.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Webhook läuft auf Port ${PORT}`);
});
