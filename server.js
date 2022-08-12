const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080

const APP_PATH = 'dist/CryptogramSolver'

express()
  .use(express.static(path.join(__dirname, APP_PATH)))
  .get('/*', (req, res) => res.sendFile(__dirname + `${APP_PATH}/index.html`))
  .listen(PORT);
