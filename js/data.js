/**
 * =========================================================
 * OurRecipes - Recipe Tags
 * =========================================================
 */

const RECIPE_TAGS = Object.freeze({
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
    STEAM_COOKER: 'steam_cooker',
    RICE_COOKER: 'rice_cooker'
});

const RECIPE_CATEGORY_LABELS = Object.freeze({
    [RECIPE_CATEGORIES.AIR_FRYER]: '氣炸鍋',
    [RECIPE_CATEGORIES.STEAM_COOKER]: '蒸氣鍋',
    [RECIPE_CATEGORIES.RICE_COOKER]: '電子鍋'
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
    ingredients: [
      "起酥片 數片",
      "蛋黃 少許",
      "黑芝麻 少許"
    ],
    steps: [
      "稍稍變軟後切成三角形（1:9）。",
      "從大邊滾至小邊成可頌形狀。",
      "蛋液塗抹均勻至小可頌上。",
      "撒上黑芝麻增添香氣。",
      "氣炸鍋 190° / 5分鐘。"
    ],
  },
];
