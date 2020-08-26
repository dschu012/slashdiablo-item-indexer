const fetch = require('node-fetch');
const d2s = require('@dschu012/d2s');
const constants = require('../lib/constants.bundle.min.json');

exports.fetch_chars = async function (names) {
  let data = [];
  names = names.split(/[,\s]/).map(d => d.toLowerCase().trim());
  for (const n of names) {
    let response = await fetch(`https://armory.slashdiablo.net/retrieving/v1/character?name=${n}`);
    if (response.ok) {
      let json = await response.json();
      try {
        let binary = await d2s.write(json.character.d2s, constants);
        json = await d2s.read(binary, constants);
        data.push({ name: n, data: json });
      } catch (e) {
        console.log(e);
        data.push({ name: n, data: null });
      }
    } else {
      data.push({ name: n, data: null });
    }
  }
  return data;
}