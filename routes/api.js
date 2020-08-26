const express = require('express');
const router = express.Router();
const d2sApi = require('../api/d2s');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send(await d2sApi.fetch_chars(req.query.data));
});

module.exports = router;
