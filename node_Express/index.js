const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 12000;

const filePath = path.join(__dirname, '../createFile/data.json');

app.get('/', (req, res) => {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  let jsonData = '';

  readStream.on('data', (chunk) => {
    jsonData += chunk;
  });

  readStream.on('end', () => {
    try {
      const parsedData = JSON.parse(jsonData);
      console.log('Number of records:', parsedData.length);
      res.json(parsedData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.json({ error: true });
    }
  });

  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    res.json({ error: true });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});