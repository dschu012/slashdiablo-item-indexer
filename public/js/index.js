const ITEM_LOCATIONS = { 1: "inv", 4: "cube", 5: "stash" };

let app = new Vue({
  el: "#app",
  data: {
    view: 'list',
    dataTable: null,
    chars: document.slash_item_tools.chars,
    rawData: document.slash_item_tools.charsData,
    charsData: null,
    filterJunk: true,
    pinned: [],
    recent: []
  },
  created() {
    this.handleCharData();
    this.viewChanged();
    this.pinned = JSON.parse(localStorage.getItem('pinned')) || [];
    this.recent = JSON.parse(localStorage.getItem('recent')) || [];
    this.addRecent();
  },
  mounted() {
    $(this.$el).popover({
      selector: '[data-toggle="popover"]',
      trigger: 'hover',
      placement: function () { return $(window).width() < 975 ? 'bottom' : 'right'; }
    });
    $('[data-toggle="tab"]').tab();
    $("#sidebarCollapse").on('click', function(){
      $("#sidebar").toggleClass('collapse');
    });
  },
  filters: {
    junk(item) {
      return !["isc", "tsc"].includes(item.type);
    },
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
      return str;
    },
    popover(item) {
      //why cant i call this.$filters.stats?
      let str = ``;
      if (item.combined_magic_attributes != null) {
        str = item.combined_magic_attributes
          .filter(attr => attr.visible !== false)
          .map(attr => attr.description)
          .join(', ');
        str = `(${str})`;
      }
      if (item.character) {
        str += `<div class="mt-1 text-right"><a href="https://armory.slashdiablo.net/character/${item.character.toLowerCase()}#inventory">${item.character}</a>`;
        if (ITEM_LOCATIONS[item.alt_position_id]) str += ` - <i>${ITEM_LOCATIONS[item.alt_position_id]} (${item.position_x}, ${item.position_y})</i>`;
        str += `</div>`;
      }
      return str;
    },
    location(item) {
      let str = ``;
      if (item.character) {
        str += `<div class="mt-1 text-right"><a href="https://armory.slashdiablo.net/character/${item.character.toLowerCase()}#inventory">${item.character}</a>`;
        if (ITEM_LOCATIONS[item.alt_position_id]) str += ` - <i>${ITEM_LOCATIONS[item.alt_position_id]} (${item.position_x}, ${item.position_y})</i>`;
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
    errors: function () {
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
        .filter(d => d.starter_item == 0)
        .filter(d => !that.filterJunk || (that.filterJunk && that.$options.filters.junk(d)))
        .sort((o1, o2) => that.$options.filters.itemName(o1).localeCompare(that.$options.filters.itemName(o2)))
    },
    allQualityItems: function () {
      let that = this;
      if (!this.charsData) return;
      return this.charsData
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => d.quality !== 0 && d.starter_item == 0)
        .filter(d => !that.filterJunk || (that.filterJunk && that.$options.filters.junk(d)))
        .sort((o1, o2) => that.$options.filters.itemName(o1).localeCompare(that.$options.filters.itemName(o2)))
    },
    allStacks: function () {
      let that = this;
      if (!this.charsData) return;
      return Object.values(this.charsData
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => d.quality === 0 && d.location_id !== 2)
        .filter(d => !that.filterJunk || (that.filterJunk && that.$options.filters.junk(d)))
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
      if (!this.allQualityItems) return;
      let o = this.groupBy(this.allQualityItems, 'quality');
      o = Object.keys(o).map(function (key) {
        return { quality: `_${key}`, items: o[key] };
      }).reverse();
      return o;
    },
    allRunes: function () {
      if (!this.allStacks) return;
      return this.allStacks.filter(i => i.type.match(/r\d\d/));
    },
    allGems: function () {
      if (!this.allStacks) return;
      return this.allStacks.filter(i => i.type.match(/g[a-z]{2}/));
    },
    allJewels: function () {
      if (!this.allQualityItems) return;
      return this.allQualityItems.filter(i => i.type.match(/jew/));
    },
    itemCounts: function () {
      let that = this;
      if (!this.charsData) return;
      return this.charsData
        .filter(d => d.data != null)
        .map(d => d.data)
        .flatMap(d => [...d.items, ...(d.merc_items || [])])
        .filter(d => !that.filterJunk || (that.filterJunk && that.$options.filters.junk(d)))
        .reduce((accumulator, currentValue) => {
          if (currentValue.count) {
            accumulator[currentValue.custom_type] = currentValue.count;
          }
          return accumulator;
        }, {});
    },
    availableRunewords: function () {
      if (!this.itemCounts) return;
      return window.runewords.filter(v => {
        for (const item in v.r) {
          if ((this.itemCounts[item] || 0) < v.r[item]) {
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
    availableCrafts: function () {
      if (!this.itemCounts) return;
      return window.crafts.filter(v => {
        for (const item in v.r) {
          if ((this.itemCounts[item] || 0) < v.r[item]) {
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
    availableCubeRecipes: function () {
      if (!this.itemCounts) return;
      return window.cube.filter(v => {
        for (const item in v.r) {
          if ((this.itemCounts[item] || 0) < v.r[item]) {
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
    viewChanged() {
      if (this.dataTable) {
        this.dataTable.destroy();
      }
      this.$nextTick(function() {
        this.dataTable = $('.datatable').DataTable({
          "paging": false
        });
      })
    },
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
    sorted(ar, field, asc) {
      if(!ar) {
        return [];
      }
      return ar.sort((a, b) => asc ? a[field] - b[field] :  b[field] - a[field])
    },
    sortKeys(obj) {
      return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
    },
    storeChars() {
      if (!window.location.search) {
        let d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        document.cookie = `chars=${this.chars}; expires=${d.toUTCString()}; path=/`;
      }
    },
    formatDate(d) {
      return Intl.DateTimeFormat("en-US", { dateStyle: 'short', timeStyle: 'long' }).format(new Date(d));
    },
    isPinned(item) {
      return this.pinned.findIndex(i => i.chars == item.chars) >= 0;
    },
    pin(item) {
      this.pinned.push(item);
      localStorage.setItem('pinned', JSON.stringify(this.pinned));
    },
    unpin(item) {
      this.pinned = this.pinned.filter(i => i.ts != item.ts);
      localStorage.setItem('pinned', JSON.stringify(this.pinned));
    },
    buildCharUri(char) {
      let url = window.location.toString();
      if (url.indexOf('?') > 0) {
        url = url.substring(0, url.indexOf('?'));
      }
      return `${url}?c=${encodeURI(char)}`
    },
    copyToClipboard() {
      let pop = $(document.querySelector("#copy")).popover();
      let url = window.location.toString();
      let target = document.querySelector("#clipboard");
      if (url.indexOf('?') > 0) {
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
    async fetchAndHandlerCharData() {
      this.charData = [];
      await this.fetchCharacters();
      await this.handleCharData();
      this.addRecent();
    },
    async fetchCharacters() {
      this.storeChars();
      let url = new URL('/api', window.location.href);
      url.search = new URLSearchParams({ data: this.chars });
      let response = await fetch(url);
      if (!response.ok) {
        alert('error communicating w/ api');
      }
      this.rawData = await response.json();
    },
    addRecent() {
      let that = this;
      if(this.chars) {
        this.recent = this.recent.filter(item => item.chars != that.chars);
        let item = { chars: this.chars, ts: new Date().getTime(), data: this.charsData };
        this.recent.push(item);
        let idx = this.pinned.findIndex(i => i.chars == that.chars);
        if(idx >= 0) {
          this.pinned[idx] = item;
          localStorage.setItem('pinned', JSON.stringify(this.pinned));
        }
        if(this.recent.length > 15) {
          this.recent.shift();
        }
        localStorage.setItem('recent', JSON.stringify(this.recent));
      }
    },
    handleCharData() {
      let d = this.rawData;
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
        "std"
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
      this.charsData = d;
    }
  }
});
