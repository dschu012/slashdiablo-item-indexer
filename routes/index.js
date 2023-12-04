const express = require('express');
const router = express.Router();
const d2sApi = require('../api/d2s');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = [];
  let chars = null;
  if(req.query.c) {
    chars = decodeURI(req.query.c);
  } else if(req.cookies["chars"]) {
    chars = decodeURI(req.cookies["chars"]);
  }
  if(chars) {
    data = await d2sApi.fetch_chars(chars)
  }

  res.render('index', { 
    title: 'Slash Inventory Manager',
    chars: chars,
    data: data,
    og: {
      title: 'Slash Inventory Manager',
      description: openGraphDescription(data),
      url: 'https://slashdiablo.appspot.com/'
    }
  });
});

function itemName(item) {
  let name = item.type_name;
  if (item.runeword_name) {
    name = `${item.runeword_name} ${name}`;
  }
  if (item.unique_name) {
    name = `${item.unique_name} ${name}`;
  }
  if (item.set_name) {
    name = `${item.set_name} ${name}`;
  }
  if (item.magic_prefix_name) {
    name = `${item.magic_prefix_name} ${name}`;
  }
  if (item.magic_suffix_name) {
    name = `${name} ${item.magic_suffix_name}`;
  }
  if (item.rare_name) {
    name = `${item.rare_name} ${name}`;
  }
  if (item.rare_name2) {
    name = `${name} ${item.rare_name2}`;
  }
  if (item.quality == 3) {
    name = `Superior ${name}`;
  }
  if (item.socketed) {
    name = `${name} (${item.total_nr_of_sockets})`;
  }
  if (item.ethereal) {
    name = `${name} [Eth]`;
  }
  return name;
}

function groupBy(array, key) {
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}

function openGraphDescription(data) {
  let d = data;
  if(d.length == 0) {
    return "Aggregate contents of multiple slashdiablo characture inventories.";
  }
  for (let c of d) {
    if (c.data != null) {
      [...c.data.items, ...(c.data.merc_items || [])]
        .forEach(d => d.character = c.name);
    }
  }

  let other_items = ["pk1", "pk2", "pk3",
    "toa",
    "dhn", "bey", "mbr",
    "tes", "ceh", "bet", "fed",
    "std",
    "isc", "tsc"
  ];

  //set quality 0 if null
  d
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...(d.merc_items || [])])
    .filter(d => d.quality === undefined || other_items.includes(d.type))
    .forEach(d => { d.quality = 0 });
  //our own quality for runewords. make em first in list
  d
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...(d.merc_items || [])])
    .filter(d => d.given_runeword === 1)
    .forEach(d => { d.quality = 9 });

  //our own code per item type/quality to group items together
  d
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...(d.merc_items || [])])
    .forEach(d => {
      d.custom_type = d.type;
      if (d.quality == 7) {
        d.custom_type = `u${d.unique_id}`;
      } else if (d.quality == 5) {
        d.custom_type = `s${d.set_id}`;
      }
    });
  d
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...(d.merc_items || [])])
    .reduce((accumulator, currentValue) => {
      if (currentValue.custom_type in accumulator) {
        accumulator[currentValue.custom_type].count++;
      } else {
        currentValue.count = 1;
        accumulator[currentValue.custom_type] = currentValue;
      }
      return accumulator
    }, {});

  d = Object.values(d
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...(d.merc_items || [])])
    .filter(d => d.starter_item == 0 && d.location_id !== 2)
    .reduce((accumulator, currentValue) => {
      if (currentValue.custom_type in accumulator) {
        accumulator[currentValue.custom_type].count++;
      } else {
        currentValue.count = 1;
        accumulator[currentValue.custom_type] = currentValue;
      }
      return accumulator
    }, {}))
    .sort((o1, o2) => itemName(o1).localeCompare(itemName(o2)))

  d = groupBy(d, 'quality');
  d = Object.keys(d).map(function (key) {
    return { quality: `_${key}`, items: d[key] };
  }).reverse();

  let s = [];
  for(let q of d) {
    for(let i of q.items) {
      s.push((i.count > 1) ? `${i.count}x ${itemName(i)}` : itemName(i));
    }
  }
  return s.join(", ");
}

module.exports = router;
