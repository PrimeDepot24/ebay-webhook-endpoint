// index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurierbarer Token – sollte mit eBay übereinstimmen
const VERIFICATION_TOKEN = 'revel-ebay-v1';

app.use(bodyParser.json());

// Healthcheck
app.get('/', (req, res) => {
  res.send('eBay Webhook Endpoint läuft ✅');
});

// Endpoint für eBay Account Deletion Webhook
app.post('/ebay-deletion', (req, res) => {
  const incomingToken = req.headers['x-ebay-signature'] || '';

  console.log('Webhook empfangen:', req.body);

  if (!incomingToken || incomingToken !== VERIFICATION_TOKEN) {
    console.warn('Ungültiger Verification Token:', incomingToken);
    return res.status(403).send('Forbidden');
  }

  // Logik für Verarbeitung oder Weiterleitung der Webhook-Nachricht hier

  res.status(200).send('Webhook empfangen');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
