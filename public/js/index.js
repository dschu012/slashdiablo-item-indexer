let scope = {
  items: null
};



function createCookie(name,value,days) {
  if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

const QUALITIES = {
  2: 'Normal',
  3: 'Superior',
  4: 'Magic',
  5: 'Set',
  6: 'Rare',
  7: 'Unique',
  8: 'Crafted',
};

rivets.binders.clazz = function(el, value) {
  if(value) {
    let c = value.toString();
    if(!isNaN(value)) {
      c = '_' + c;
    }
    $(el).addClass(c);
  }
}

rivets.formatters.empty = function(v) {
  return v == null || v.length === 0;
}

rivets.formatters.runes = function(v) {
  return v.filter(i => i.type.match(/r\d\d/));
}

rivets.formatters.runeword_link = function(v) {
  return `https://diablo2.diablowiki.net/${encodeURIComponent(v.name)}`
}

rivets.formatters.json = function(v) {
  return JSON.stringify(v);
}

rivets.formatters.quality = function(v, arg) {
  if(!v) return; 
  return v.filter(i => i.quality === arg);
}

rivets.formatters.stats = function(item) {
  if(item.combined_magic_attributes == null) {
    return;
  }
  let str = item.combined_magic_attributes
    .filter(attr => attr.visible !== false)
    .map(attr => attr.description)
    .join(', ');
  return ` (${str})`;
}

rivets.formatters.name = function(item) {
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
  return name;
}

var view = rivets.bind(document.querySelector("body"), {scope: scope});

async function doSubmit() {
  let url = new URL('/api', window.location.href);
  url.search = new URLSearchParams({ data: document.querySelector("#chars").value });
  let response = await fetch(url);
  if(!response.ok) {
    alert('error communicating w/ api');
  }
  let data = await response.json();

  //hacks
  //set quality 0 if null
  data
      .filter(d => d.data != null)
      .map(d => d.data)
      .flatMap(d => [...d.items, ...d.merc_items])
      .filter(d => d.quality === undefined)
      .forEach(d => { d.quality = 0 });
  //our own quality for runewords. make em first in list
  data
    .filter(d => d.data != null)
    .map(d => d.data)
    .flatMap(d => [...d.items, ...d.merc_items])
    .filter(d => d.given_runeword === 1)
    .forEach(d => { d.quality = 9 });

  scope.items = {
    all_items: data
      .filter(d => d.data != null)
      .map(d => d.data)
      .flatMap(d => [...d.items, ...d.merc_items])
      .filter(d => d.quality !== 0)
      .sort((o1, o2) => rivets.formatters.name(o1).localeCompare(rivets.formatters.name(o2))),
    all_qualities: Array.from(new Set(data
      .filter(d => d.data != null)
      .map(d => d.data)
      .flatMap(d => [...d.items, ...d.merc_items])
      .filter(d => d.quality !== 0)
      .sort((o1, o2) => o1.type.localeCompare(o2.type))
      .map(d => d.quality)
      .sort()
      .reverse())),
    all_stacks: Object.values(data
      .filter(d => d.data != null)
      .map(d => d.data)
      .flatMap(d => [...d.items, ...d.merc_items])
      .filter(d => d.quality === 0)
      .reduce((accumulator, currentValue) => {
        if(currentValue.type in accumulator) {
          accumulator[currentValue.type].count++;
        } else {
          currentValue.count = 1;
          accumulator[currentValue.type] = currentValue;
        }
        return accumulator
      }, {}))
      .sort((o1, o2) => rivets.formatters.name(o1).localeCompare(rivets.formatters.name(o2))),
    errors: data.filter(d => d.data === null).map(d => d.name).join(", ")
  };
  let runes = scope.items.all_stacks.filter(i => i.type.match(/r\d\d/))
    .reduce((accumulator, currentValue) => { 
      accumulator[currentValue.type] = currentValue.count ;
      return accumulator;
    }, {});
  scope.runewords = window.runewords.filter(v => {
    for(const rune in v.r) {
      if((runes[rune] || 0) < v.r[rune]) {
        return false;
      }
    }
    return true;
  })
  .sort((o1, o2) => o1.name.localeCompare(o2.name));
}

var pop = $(document.querySelector("#copy")).popover();
document.querySelector("#copy").onclick = async function(event) {
  let url = window.location.toString();
  let target = document.querySelector("#clipboard");
  if(url.indexOf('?') > 0) {
    url = url.substring(0, url.indexOf('?'));
  }
  target.value = `${url}?c=${encodeURI(document.querySelector("#chars").value)}`;
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  document.execCommand("copy");
  currentFocus.focus();
  pop.popover('show');
  setTimeout(() => pop.popover('hide'), 1000);
}

document.querySelector("#form").onsubmit = async function(event) {
  event.preventDefault();
  await doSubmit();
}

document.querySelector("#chars").value = readCookie('chars');
if(window.location.search) {
  document.querySelector("#chars").value = new URLSearchParams(window.location.search).getAll('c').join(', ');
}
if(document.querySelector("#chars").value) {
  (async () => { await doSubmit() })();
}
document.querySelector("#chars").onchange = function(e) {
  createCookie("chars", this.value, 365);
}