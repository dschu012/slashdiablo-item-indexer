const fetch = require('node-fetch');
const d2s = require('@dschu012/d2s');
const constants = require('../lib/constants.bundle.min.json');

async function fetch_char(n) {
  let response = await fetch(`https://armory.slashdiablo.net/api/v1/characters?name=${n}`);
    if (response.ok) {
      let json = await response.json();
      try {
        let binary = await d2s.write(json.character.d2s, constants);
        json = await d2s.read(binary, constants);
        return { name: n, data: json };
      } catch (e) {
        console.log(e);
        return { name: n, data: null };
      }
    } else {
      return { name: n, data: null };
    }
}

exports.fetch_chars = async function (names) {
  let data = [];
  names = names.split(/[,\s]/).map(d => d.toLowerCase().trim())
    .filter((e, i) => i < 8);
  data = Promise.all(names.map(e => fetch_char(e)));
  return data;
}