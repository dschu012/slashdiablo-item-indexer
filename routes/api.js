var express = require('express');
var fetch = require('node-fetch');
var d2s = require('@dschu012/d2s');
var constants = require('../lib/constants.bundle.min.json');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let names = req.query.data;
  let data = [];
  names = names.split(/[,\s]/).map(d => d.toLowerCase().trim());
  for(const n of names) {
    let response = await fetch(`https://armory.slashdiablo.net/retrieving/v1/character?name=${n}`);
    if(response.ok) {
      let json = await response.json();
      let binary = await d2s.write(json.character.d2s, constants);
      json = await d2s.read(binary, constants);
      data.push({name: n, data: json });
    } else {
      data.push({name: n, data: null });
    }
  }
  res.send(data);
});

module.exports = router;
