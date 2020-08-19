// http://classic.battle.net/diablo2exp/items/crafted/caster.shtml
// var a = []; document.querySelectorAll("table > tbody > tr").forEach(row => { if(row.children[0].textContent.includes("Caster") && row.children[1]) { a.push({ name: row.children[0].textContent, recipe: row.children[1].textContent.trim().split('\n'), r:{}, stats: row.children[2].textContent.trim().split('\n')  }) }}); JSON.stringify(a, null, 2);

// https://dschu012.github.io/d2s/
// Object.keys(constants.constants.other_items).forEach(k => constants.constants.other_items[k].k = k);
// window.crafts.forEach(c => { c.r = {}; c.recipe.forEach(r => { let v = Object.values(constants.constants.other_items).find(e => e.n == r); if(v) c.r[v.key] = 1; })});

window.crafts = [
  {
    "name": "Caster Helm",
    "recipe": [
      "Magic Mask/Death Mask/Demonhead Mask",
      "Nef Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r04": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "(1-4)% Mana Stolen Per Hit",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Boots",
    "recipe": [
      "Magic Boots/Demonhide Boots/Wyrmhide Boots",
      "Thul Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r10": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "Increase Maximum Mana (2-5)%",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Gloves",
    "recipe": [
      "Magic Leather Gloves/Demonhide Gloves/Bramble Mitts",
      "Ort Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r09": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-3) Mana Per Kill",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Belt",
    "recipe": [
      "Magic Light Belt/Sharkskin Belt/Vampirefang Belt",
      "Ith Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r06": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "5-10% Faster Cast Rate",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Shield",
    "recipe": [
      "Magic Small Shield/Round Shield/Luna",
      "Eth Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r05": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "+ (5-10)% Increased Chance Of Blocking",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Body",
    "recipe": [
      "Magic Light Plate/Mage Plate/Archon Plate",
      "Tal Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r07": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-3) Mana Per Kill",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Amulet",
    "recipe": [
      "Magic Amulet",
      "Ral Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r08": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "(5-10)% Faster Cast Rate",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Ring",
    "recipe": [
      "Magic Ring",
      "Amn Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r11": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-5) To Energy",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Caster Weapon",
    "recipe": [
      "Magic Normal/Exceptional/Elite Rod**",
      "Tir Rune",
      "Perfect Amethyst",
      "Any Jewel"
    ],
    "r": {
      "r03": 1,
      "gpv": 1,
      "jew": 1
    },
    "stats": [
      "Increase Maximum Mana (1-5)%",
      "Regenerate Mana (4-10)%",
      "+ (10-20) To Mana"
    ]
  },
  {
    "name": "Hit Power Helm",
    "recipe": [
      "Magic Full Helm/Basinet/Giant Conch",
      "Ith Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r06": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "(25-50) Defense vs. Missiles",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-7)"
    ]
  },
  {
    "name": "Hit Power Boots",
    "recipe": [
      "Magic Chain/Mesh/Boneweave Boots",
      "Ral Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r08": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "(25-50) Defense vs. Melee",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-7)"
    ]
  },
  {
    "name": "Hit Power Gloves",
    "recipe": [
      "Magic Chain Gloves/Heavy Bracers/Vambraces",
      "Ort Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r09": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "Knockback",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-7)"
    ]
  },
  {
    "name": "Hit Power Belt",
    "recipe": [
      "Magic Heavy Belt/Battle Belt/Troll Belt",
      "Tal Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r07": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "(5-10) % Damage Goes to Mana",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-7)"
    ]
  },
  {
    "name": "Hit Power Shield",
    "recipe": [
      "Magic Gothic Shield/Ancient Shield/Ward",
      "Eth Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r05": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "(5-10%) Increased Chance of Blocking",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-10)"
    ]
  },
  {
    "name": "Hit Power Body",
    "recipe": [
      "Magic Field Plate/Sharktooth Armor/Kraken Shell",
      "Nef Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r04": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "10-20% Faster Hit Recovery",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-10)"
    ]
  },
  {
    "name": "Hit Power Amulet",
    "recipe": [
      "Magic Amulet",
      "Thul Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r10": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "Hit Causes Monster To Flee (3-11)%",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-10)"
    ]
  },
  {
    "name": "Hit Power Ring",
    "recipe": [
      "Magic Ring",
      "Amn Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r11": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-5) To Dexterity",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-6)"
    ]
  },
  {
    "name": "Hit Power Weapon",
    "recipe": [
      "Magic Normal/Exceptional/Elite Blunt Weapon",
      "Tir Rune",
      "Perfect Sapphire",
      "Any Jewel"
    ],
    "r": {
      "r03": 1,
      "gpb": 1,
      "jew": 1
    },
    "stats": [
      "+ (35-60%) Enhanced Damage",
      "5% Chance To Cast Level 4 Frost Nova When Struck",
      "Attacker Takes Damage of (3-7)"
    ]
  },
  {
    "name": "Blood Helm",
    "recipe": [
      "Magic Helm/Casque/Armet",
      "Ral Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r08": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "5-10% Deadly Strike",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Boots",
    "recipe": [
      "Magic Light Plated Boots/Battle Boots/Mirrored Boots",
      "Eth Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r05": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "Replenish Life + (5-10)",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Gloves",
    "recipe": [
      "Magic Heavy Gloves/Sharkskin Gloves/Vampirebone Gloves",
      "Nef Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r04": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "Crushing Blow (5-10)%",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Belt",
    "recipe": [
      "Magic Belt/Mesh Belt/Mithril Coil",
      "Tal Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r07": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "Open Wounds (5-10)%",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Shield",
    "recipe": [
      "Magic Spiked Shield/Barbed Shield/Blade Barrier",
      "Ith Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r06": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "Attacker Takes Damage of (4-7)",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Body",
    "recipe": [
      "Magic Plate Mail/Templar Coat/Hellforge Plate",
      "Thul Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r10": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-3) Life Per Demon Kill",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Amulet",
    "recipe": [
      "Magic Amulet",
      "Amn Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r11": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "5-10% Faster Run/Walk",
      "(1-4)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Ring",
    "recipe": [
      "Magic Ring",
      "Sol Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r12": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-5) To Strength",
      "(1-3)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Blood Weapon",
    "recipe": [
      "Magic Normal/Exceptional/Elite Axe",
      "Ort Rune",
      "Perfect Ruby",
      "Any Jewel"
    ],
    "r": {
      "r09": 1,
      "gpr": 1,
      "jew": 1
    },
    "stats": [
      "+ (35-60%) Enhanced Damage",
      "(1-4)% Life Stolen Per Hit",
      "+(10-20) To Life"
    ]
  },
  {
    "name": "Safety Helm",
    "recipe": [
      "Magic Crown/Grand Crown/Corona",
      "Ith Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r06": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Lightning Resist + (5-10)%",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Boots",
    "recipe": [
      "Magic Greaves/War Boots/Myrmidon Boots",
      "Ort Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r09": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Fire Resist + (5-10)%",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Gloves",
    "recipe": [
      "Magic Gauntlets/War Gauntlets/Ogre Gauntlets",
      "Ral Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r08": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Cold Resist + (5-10)%",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Belt",
    "recipe": [
      "Magic Sash/Demonhide Sash/Spiderweb Sash",
      "Tal Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r07": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Poison Resist +(5-10)%",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Shield",
    "recipe": [
      "Magic Kite Shield/Dragon Shield/Monarch",
      "Nef Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r04": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Magic Resistance +(5-10)%",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Body",
    "recipe": [
      "Magic Breast Plate/Cuirass/Great Hauberk",
      "Eth Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r05": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (10-30)% Enhanced Defense",
      "Half Freeze Duration",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Amulet",
    "recipe": [
      "Magic Amulet",
      "Thul Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r10": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-10)% Increased Chance Of Blocking",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Ring",
    "recipe": [
      "Magic Ring",
      "Amn Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r11": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (1-5) To Vitality",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  },
  {
    "name": "Safety Weapon",
    "recipe": [
      "Magic Normal/Exceptional/Elite Spear or Javelin",
      "Sol Rune",
      "Perfect Emerald",
      "Any Jewel"
    ],
    "r": {
      "r12": 1,
      "gpg": 1,
      "jew": 1
    },
    "stats": [
      "+ (5-10%) Enhanced Defense",
      "Magic Damage Reduced By (1-2)",
      "Damage Reduced By (1-4)"
    ]
  }
];