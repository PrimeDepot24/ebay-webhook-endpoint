import express from "express";

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const challengeCode = req.body.challengeCode;
  if (challengeCode) {
    res.set("Content-Type", "text/plain");
    return res.status(200).send(challengeCode);
  }
  res.status(400).send("Missing challengeCode");
});

app.get("/", (req, res) => {
  res.send("✅ Webhook läuft – POST erwartet.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Webhook läuft auf Port ${PORT}`);
});
