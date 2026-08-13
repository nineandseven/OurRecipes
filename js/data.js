/**
 * ====、醬油、為林===============================================
 * OurRecipes - Recipe Tags
 * =========================================================
 */

const RECIPE_TAGS = Object.freeze({
  FAT_LOSS: "fat_loss",
  TOFU: "tofu",
  CHICKEN: "chicken",
  EGG: "egg",
  TOMATO: "tomato",
  CHEESE: "cheese",
  QUICK: "quick",
  HEALTHY: "healthy",
  PORK: "pork",
  BEEF: "beef",
});

const RECIPE_TAG_LABELS = Object.freeze({
  [RECIPE_TAGS.FAT_LOSS]: "減脂",
  [RECIPE_TAGS.TOFU]: "豆腐",
  [RECIPE_TAGS.CHICKEN]: "雞肉",
  [RECIPE_TAGS.EGG]: "雞蛋",
  [RECIPE_TAGS.TOMATO]: "番茄",
  [RECIPE_TAGS.CHEESE]: "起司",
  [RECIPE_TAGS.QUICK]: "快速",
  [RECIPE_TAGS.HEALTHY]: "健康",
  [RECIPE_TAGS.PORK]: "豬肉",
  [RECIPE_TAGS.BEEF]: "牛肉",
});

/**
 *
 */

const RECIPE_CATEGORIES = Object.freeze({
  AIR_FRYER: "air_fryer",
  STEAM_COOKER: "steam_cooker",
  RICE_COOKER: "rice_cooker",
  GAS_STOVE: "gas_stove",
});

const RECIPE_CATEGORY_LABELS = Object.freeze({
  [RECIPE_CATEGORIES.AIR_FRYER]: "氣炸鍋",
  [RECIPE_CATEGORIES.STEAM_COOKER]: "蒸氣鍋",
  [RECIPE_CATEGORIES.RICE_COOKER]: "電子鍋",
  [RECIPE_CATEGORIES.GAS_STOVE]: "瓦斯爐",
});

/**
 * =========================================================
 * OurRecipes - Recipe Data
 * =========================================================
 */

const recipes = [
  {
    id: 1,
    title: "氣炸迷你可頌",
    category: RECIPE_CATEGORIES.AIR_FRYER,
    description: "簡易氣炸小點心",
    image: "./images/recipes/氣炸迷你可頌.png",
    time: 10,
    servings: 1,
    difficulty: "簡單",
    tags: [RECIPE_TAGS.EGG],
    ingredients: ["起酥片 數片", "蛋黃 少許", "黑芝麻 少許"],
    steps: [
      "稍稍變軟後切成三角形（1:9）。",
      "從大邊滾至小邊成可頌形狀。",
      "蛋液塗抹均勻至小可頌上。",
      "撒上黑芝麻增添香氣。",
      "氣炸鍋 190° / 5分鐘。",
    ],
  },
  {
    id: 2,
    title: "家常麻婆豆腐",
    category: RECIPE_CATEGORIES.GAS_STOVE,
    description: "簡易麻婆豆腐",
    image: "./images/recipes/家常麻婆豆腐.png",
    time: 10,
    servings: 1,
    difficulty: "簡單",
    tags: [RECIPE_TAGS.FAT_LOSS, RECIPE_TAGS.TOFU, RECIPE_TAGS.PORK],
    ingredients: [
      "板豆腐 半盒",
      "豬絞肉 200g",
      "醬油 2勺",
      "子樂辣椒醬 少許",
      "花椒粉 少許",
      "蒜頭 3辦",
      "薑末 少許",
      "蔥白 少許",
    ],
    steps: [
      "所有備料除了板豆腐煸香後再加入板豆腐。",
      "加入醬油、子樂辣椒醬、花椒粉炒香。",
      "加入少許水煨煮10分鐘。",
      "起鍋！",
    ],
  },
  {
    id: 3,
    title: "親子丼飯",
    category: RECIPE_CATEGORIES.GAS_STOVE,
    description: "簡易親子丼，洋蔥走開",
    image: "./images/recipes/親子丼飯.png",
    time: 10,
    servings: 1,
    difficulty: "簡單",
    tags: [RECIPE_TAGS.CHICKEN, RECIPE_TAGS.EGG],
    ingredients: [
      "去骨雞腿肉 1份",
      "蛋 2顆",
      "柴魚醬油 1匙",
      "醬油 2匙",
      "味醂 2匙",
      "水 少許",
    ],
    steps: [
      "將雞腿肉切成一口大小放入鍋中，若有其他的料也可一同放入。",
      "將柴魚醬油、醬油、味醂混和攪拌加入鍋中。",
      "加入水至食材9分滿。",
      "開火煮滾。",
      "將蛋稍微打散，倒入一半後蓋上鍋蓋悶熟。",
      "將剩餘蛋液倒入鍋中後悶熟便可起鍋。"
    ],
  },
];
