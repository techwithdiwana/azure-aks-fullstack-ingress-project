const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from AKS Backend API via Ingress-check'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
