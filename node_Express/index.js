const express = require('express')
const data = require('../large-file.json');
const app = express()
const port = 12000

app.get('/', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})