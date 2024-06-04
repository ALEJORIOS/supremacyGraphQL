const express = require('express');
const app = express();
const port = 12000;
const data = require('../createFile/data.json');

app.use(express.json());

app.post('/findOne', (req, res) => {
  res.json(findOne(req.body.id))
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function findOne(id) {
  return data.filter(rcd => rcd.id === id)?.[0] || {}
}