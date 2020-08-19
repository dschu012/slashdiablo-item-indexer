const ITEM_LOCATIONS = { 1: "inv", 4: "cube", 5: "stash" };

let app = new Vue({
  el: "#app",
  data: {
    chars: null,
    charsData: null
  },
  created() {
    this.chars = window.location.search
      ? new URLSearchParams(window.location.search).getAll('c').join(', ')
      : window.localStorage.getItem('chars');
    if (this.chars) {
      this.fetchCharacters();
    }
  },
  mounted() {
    $(this.$el).popover({
      selector: '[data-toggle="popover"]',
      trigger: 'hover',
      placement: function() { return $(window).width() < 975 ? 'bottom' : 'right'; }
    });
    $('[data-toggle="tab"]').tab();
  },
  filters: {
    itemName(item) {
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
    },
    stats(item) {
      let str = ``;
      if (item.combined_magic_attributes != null) {
        str = item.combined_magic_attributes
          .filter(attr => attr.visible !== false)
          .map(attr => attr.description)
          .join(', ');
        str = `(${str})`;
      }
      if (item.character && !item.count) {
        str += `<div class="mt-1 text-right"><a href="https://armory.slashdiablo.net/character/${item.character.toLowerCase()}#inventory">${item.character}</a>`;
        if(ITEM_LOCATIONS[item.alt_position_id]) str += ` - <i>${ITEM_LOCATIONS[item.alt_position_id]} (${item.position_x}, ${item.position_y})</i>`;
        str += `</div>`;
      }
      return str;
    },
    runewordLink(runeword) {
      return `https://diablo2.diablowiki.net/${encodeURIComponent(runeword.name)}`;
    },
    armoryLink(charData) {
      return `https://armory.slashdiablo.net/character/${charData.name.toLowerCase()}#inventory`;
    }
  },
  computed: {
    errors: function() {
      if (!this.charsData) return;
      return this.charsData
        .filter(d => d.data == null)
        .map(d => d.name)
        .join(", ");
    },
    allItems: function () {
      let that = this;
      if (!this.charsData) return;
      return this.charsData
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => d.quality !== 0 && d.starter_item == 0)
        .sort((o1, o2) => that.$options.filters.itemName(o1).localeCompare(that.$options.filters.itemName(o2)))
    },
    allStacks: function () {
      let that = this;
      if (!this.charsData) return;
      return Object.values(this.charsData
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => d.quality === 0)
        .reduce((accumulator, currentValue) => {
          if (currentValue.custom_type in accumulator) {
            accumulator[currentValue.custom_type].count++;
          } else {
            currentValue.count = 1;
            accumulator[currentValue.custom_type] = currentValue;
          }
          return accumulator
        }, {}))
        .sort((o1, o2) => that.$options.filters.itemName(o1).localeCompare(that.$options.filters.itemName(o2)))
    },
    allItemsGroupedByQuality: function () {
      if (!this.allItems) return;
      let o = this.groupBy(this.allItems, 'quality');
      o = Object.keys(o).map(function (key) {
        return { quality: `_${key}`, items: o[key] };
      }).reverse();
      return o;
    },
    allRunes: function() {
      if (!this.allStacks) return;
      return this.allStacks.filter(i => i.type.match(/r\d\d/));
    },
    allGems: function() {
      if (!this.allStacks) return;
      return this.allStacks.filter(i => i.type.match(/g[a-z]{2}/));
    },
    allJewels: function() {
      if (!this.allItems) return;
      return this.allItems.filter(i => i.type.match(/jew/));
    },
    itemCounts: function() {
      if (!this.charsData) return;
      return this.charsData
      .filter(d => d.data != null)
      .map(d => d.data)
      .flatMap(d => [...d.items, ...(d.merc_items || [])])
      .reduce((accumulator, currentValue) => { 
        if(currentValue.count) {
          accumulator[currentValue.custom_type] = currentValue.count;
        }
        return accumulator;
      }, {});
    },
    availableRunewords: function() {
      if(!this.itemCounts) return;
      return window.runewords.filter(v => {
        for(const item in v.r) {
          if((this.itemCounts[item] || 0) < v.r[item]) {
            return false;
          }
        }
        return true;
      })
      .map(runeword => {
        return {
          "name": runeword.name,
          "runes": runeword.runes,
          "count": Math.floor(Math.min(...Object.keys(runeword.r).map(rune => this.itemCounts[rune] / runeword.r[rune])))
        }
      })
      .sort((o1, o2) => o1.name.localeCompare(o2.name));
    },
    availableCrafts: function() {
      if(!this.itemCounts) return;
      return window.crafts.filter(v => {
        for(const item in v.r) {
          if((this.itemCounts[item] || 0) < v.r[item]) {
            return false;
          }
        }
        return true;
      })
      .map(craft => {
        return {
          "name": craft.name,
          "recipe": craft.recipe.join(", "),
          "count": Math.floor(Math.min(...Object.keys(craft.r).map(item => this.itemCounts[item] / craft.r[item])))
        }
      });
    },
    availableCubeRecipes: function() {
      if(!this.itemCounts) return;
      return window.cube.filter(v => {
        for(const item in v.r) {
          if((this.itemCounts[item] || 0) < v.r[item]) {
            return false;
          }
        }
        return true;
      })
      .map(cubeRecipe => {
        return {
          "name": cubeRecipe.name,
          "recipe": cubeRecipe.recipe.join(", "),
          "count": Math.floor(Math.min(...Object.keys(cubeRecipe.r).map(item => this.itemCounts[item] / cubeRecipe.r[item])))
        }
      });
    }
  },
  methods: {
    groupBy(array, key) {
      const result = {}
      array.forEach(item => {
        if (!result[item[key]]) {
          result[item[key]] = []
        }
        result[item[key]].push(item)
      })
      return result
    },
    sortKeys(obj) {
      return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
    },
    storeChars() {
      if (!window.location.search) {
        window.localStorage.setItem('chars', this.chars);
      }
    },
    copyToClipboard() {
      let pop = $(document.querySelector("#copy")).popover();
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
    },
    async fetchCharacters() {
      this.storeChars();
      let url = new URL('/api', window.location.href);
      url.search = new URLSearchParams({ data: this.chars });
      let response = await fetch(url);
      if (!response.ok) {
        alert('error communicating w/ api');
      }
      let d = await response.json();
      for(let c of d) {
        if(c.data != null) {
          [...c.data.items, ...(c.data.merc_items || [])]
            .forEach(d => d.character = c.name);
        }
      }
      
      //set quality 0 if null
      d
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => d.quality === undefined)
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
          if(d.quality == 7) {
            d.custom_type = `u${d.unique_id}`;
          } else if(d.quality == 5) {
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
      this.charsData = d;
    }
  }
});