/**
 * =========================================================
 * OurRecipes - Application
 * =========================================================
 */

const state = {
  category: "",
  tag: "",
  keyword: "",
  favoritesOnly: false,
};

const STORAGE_KEYS = {
  favorites: "ourrecipes-favorites",
  theme: "ourrecipes-theme",
};

let favorites = getFavorites();

const elements = {
  body: document.body,
  searchInput: document.querySelector("#searchInput"),
  recipeGrid: document.querySelector("#recipeGrid"),
  recipeCount: document.querySelector(".recipe-count"),
  emptyState: document.querySelector(".empty-state"),
  filterButtons: document.querySelectorAll(".filter-button"),
  navItems: document.querySelectorAll(".nav-item"),
  tags: document.querySelectorAll(".tag"),
  themeButton: document.querySelector(".theme-button"),
  modal: document.querySelector("#recipeModal"),
  modalClose: document.querySelector(".modal-close"),
  modalImage: document.querySelector(".modal-image img"),
  modalCategory: document.querySelector(".modal-category"),
  modalTitle: document.querySelector(".modal-title"),
  modalDescription: document.querySelector(".modal-description"),
  modalMeta: document.querySelector(".modal-meta"),
  ingredientList: document.querySelector(".ingredient-list"),
  stepList: document.querySelector(".step-list"),
  navCounts: {
    all: document.querySelector('[data-count="all"]'),
    favorites: document.querySelector('[data-count="favorites"]'),
    recent: document.querySelector('[data-count="recent"]'),
  },
  tagList: document.querySelector("#tagList"),
  categoryToolbar: document.querySelector("#categoryToolbar"),
};

/* =========================================================
   STORAGE
========================================================= */

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function isFavorite(id) {
  return favorites.includes(id);
}

/* =========================================================
   RECIPE
========================================================= */

function getRecipe(id) {
  return recipes.find((recipe) => recipe.id === id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  renderRecipes();
}

/* =========================================================
   FILTER
========================================================= */

function filterRecipes() {
  const keyword = state.keyword.trim().toLowerCase();

  return recipes.filter((recipe) => {
    const searchText = [
      recipe.title,
      recipe.description,
      recipe.category,
      ...recipe.tags,
      ...recipe.ingredients,
    ]
      .join(" ")
      .toLowerCase();

    const matchKeyword = !keyword || searchText.includes(keyword);

    const matchCategory = !state.category || recipe.category === state.category;

    const matchTag = !state.tag || recipe.tags.includes(state.tag);

    const matchFavorite = !state.favoritesOnly || isFavorite(recipe.id);

    return matchKeyword && matchCategory && matchTag && matchFavorite;
  });
}

/* =========================================================
   RENDER
========================================================= */

function renderRecipes() {
  const result = filterRecipes();

  updateMenuCounts();

  elements.recipeCount.textContent = `共 ${result.length} 道食譜`;

  if (!result.length) {
    elements.recipeGrid.innerHTML = "";
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";
  elements.recipeGrid.innerHTML = result.map(createRecipeCard).join("");
  bindRecipeCardEvents();
}

function createRecipeCard(recipe) {
  const favorite = isFavorite(recipe.id);
  const image = recipe.image
    ? `
            <img
                src="${recipe.image}"
                alt="${escapeHtml(recipe.title)}"
                loading="lazy"
            >
        `
    : `
            <div class="recipe-image-placeholder">
                <span class="material-symbols-rounded">restaurant</span>
            </div>
        `;

  return `
        <article class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-image">
                ${image}

                <button
                    class="favorite-button ${favorite ? "is-favorite" : ""}"
                    data-favorite="${recipe.id}"
                    type="button"
                    aria-label="收藏"
                >
                    <span class="material-symbols-rounded">favorite</span>
                </button>
            </div>

            <div class="recipe-content">
               <div class="recipe-category">
                    ${escapeHtml(RECIPE_CATEGORY_LABELS[recipe.category])}
                </div>

                <h3 class="recipe-title">
                    ${escapeHtml(recipe.title)}
                </h3>

                <p class="recipe-description">
                    ${escapeHtml(recipe.description)}
                </p>

                <div class="recipe-tags">
                    ${recipe.tags
                      .slice(0, 3)
                      .map(
                        (tag) => `
                        <span class="recipe-tag">
                            ${escapeHtml(getTagLabel(tag))}
                        </span>
                    `,
                      )
                      .join("")}
                </div>

                <div class="recipe-meta">
                    <div class="meta-item">
                        <span class="material-symbols-rounded">schedule</span>
                        ${recipe.time} 分鐘
                    </div>

                    <div class="meta-item">
                        <span class="material-symbols-rounded">signal_cellular_alt</span>
                        ${escapeHtml(recipe.difficulty)}
                    </div>
                </div>
            </div>
        </article>
    `;
}

function updateMenuCounts() {
  const allCount = recipes.length;
  const favoriteCount = favorites.length;
  const recentCount = Math.min(recipes.length, 5);

  elements.navCounts.all.textContent = allCount;
  elements.navCounts.favorites.textContent = favoriteCount;
  elements.navCounts.recent.textContent = recentCount;
}

function renderTags() {
  const tags = Object.values(RECIPE_TAGS);

  elements.tagList.innerHTML = tags
    .map(
      (tag) => `
        <button
            class="tag ${state.tag === tag ? "active" : ""}"
            type="button"
            data-tag="${tag}"
        >
            ${escapeHtml(getTagLabel(tag))}
        </button>
    `,
    )
    .join("");

  bindTagEvents();
}

function renderCategoryToolbar() {
  const categories = Object.values(RECIPE_CATEGORIES);

  elements.categoryToolbar.innerHTML = categories
    .map(
      (category) => `
        <button
            class="category-button ${state.category === category ? "active" : ""}"
            type="button"
            data-category="${category}"
        >
            ${escapeHtml(RECIPE_CATEGORY_LABELS[category])}
        </button>
    `,
    )
    .join("");

  bindCategoryEvents();
}

/* =========================================================
   CARD EVENTS
========================================================= */

function bindRecipeCardEvents() {
  const cards = document.querySelectorAll(".recipe-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      openRecipe(id);
    });
  });

  const favoriteButtons = document.querySelectorAll("[data-favorite]");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = Number(button.dataset.favorite);
      toggleFavorite(id);
    });
  });
}

/* =========================================================
   SEARCH
========================================================= */

function bindSearchEvent() {
  elements.searchInput.addEventListener("input", (event) => {
    state.keyword = event.target.value;
    renderRecipes();
  });
}

/* =========================================================
   CATEGORY
========================================================= */

function bindCategoryEvents() {
  const buttons = elements.categoryToolbar.querySelectorAll("[data-category]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      if (state.category === category) {
        state.category = "";
      } else {
        state.category = category;
      }

      renderCategoryToolbar();
      renderRecipes();
    });
  });
}

/* =========================================================
   TAG
========================================================= */

function bindTagEvents() {
  elements.tags = document.querySelectorAll(".tag");

  elements.tags.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag;

      if (state.tag === tag) {
        state.tag = "";
      } else {
        state.tag = tag;
      }

      renderTags();
      renderRecipes();
    });
  });
}

/* =========================================================
   NAVIGATION
========================================================= */

function bindNavigationEvents() {
  elements.navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index === 0) {
        showAllRecipes(item);
        return;
      }

      if (index === 1) {
        showFavorites(item);
        return;
      }

      if (index === 2) {
        showRecentRecipes(item);
      }
    });
  });
}

function showAllRecipes(item) {
  state.favoritesOnly = false;
  state.category = "";
  state.tag = "";

  elements.tags.forEach((tag) => {
    tag.classList.remove("active");
  });

  elements.filterButtons.forEach((button) => {
    button.classList.remove("active");

    if (button.textContent.trim() === "全部") {
      button.classList.add("active");
    }
  });

  setActiveNav(item);
  renderRecipes();
}

function showFavorites(item) {
  state.favoritesOnly = true;
  setActiveNav(item);
  renderRecipes();
}

function showRecentRecipes(item) {
  state.favoritesOnly = false;

  const result = [...recipes].sort((a, b) => b.id - a.id);

  elements.recipeCount.textContent = `共 ${result.length} 道食譜`;
  elements.emptyState.style.display = "none";
  elements.recipeGrid.innerHTML = result.map(createRecipeCard).join("");

  setActiveNav(item);
  bindRecipeCardEvents();
}

function setActiveNav(activeItem) {
  elements.navItems.forEach((item) => {
    item.classList.remove("active");
  });

  activeItem.classList.add("active");
}

/* =========================================================
   MODAL
========================================================= */

function openRecipe(id) {
  const recipe = getRecipe(id);

  if (!recipe) {
    return;
  }

  elements.modalImage.src = recipe.image;
  elements.modalImage.alt = recipe.title;
  elements.modalCategory.textContent = RECIPE_CATEGORY_LABELS[recipe.category];
  elements.modalTitle.textContent = recipe.title;
  elements.modalDescription.textContent = recipe.description;

  elements.modalMeta.innerHTML = `
        <div class="modal-meta-item">
            <span class="material-symbols-rounded">schedule</span>
            ${recipe.time} 分鐘
        </div>
        <div class="modal-meta-item">
            <span class="material-symbols-rounded">restaurant</span>
            ${recipe.servings} 人份
        </div>
        <div class="modal-meta-item">
            <span class="material-symbols-rounded">signal_cellular_alt</span>
            ${escapeHtml(recipe.difficulty)}
        </div>
    `;

  elements.ingredientList.innerHTML = recipe.ingredients
    .map(
      (ingredient) => `
        <div class="ingredient">
            ${escapeHtml(ingredient)}
        </div>
    `,
    )
    .join("");

  elements.stepList.innerHTML = recipe.steps
    .map(
      (step, index) => `
        <div class="step">
            <div class="step-number">
                ${index + 1}
            </div>
            <div class="step-text">
                ${escapeHtml(step)}
            </div>
        </div>
    `,
    )
    .join("");

  elements.modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeRecipeModal() {
  elements.modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

function bindModalEvents() {
  elements.modalClose.addEventListener("click", closeRecipeModal);

  elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) {
      closeRecipeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      elements.modal.classList.contains("is-open")
    ) {
      closeRecipeModal();
    }
  });
}

/* =========================================================
   THEME
========================================================= */
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getSystemTheme() {
  return systemTheme.matches ? "dark" : "light";
}

function getTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return getSystemTheme();
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeIcon(theme);
  updateThemeColor(theme);
}

function updateThemeIcon(theme) {
  const icon = elements.themeButton?.querySelector(".material-symbols-rounded");

  if (!icon) {
    return;
  }

  icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

function updateThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');

  if (!meta) {
    return;
  }

  meta.content = theme === "dark" ? "#111111" : "#f7f7f5";
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
  setTheme(nextTheme);
}

function bindThemeEvents() {
  elements.themeButton.addEventListener("click", toggleTheme);

  systemTheme.addEventListener("change", (event) => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

    if (savedTheme) {
      return;
    }

    setTheme(event.matches ? "dark" : "light");
  });
}

function initTheme() {
  setTheme(getTheme());
}

/* =========================================================
   UTIL
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTagLabel(tag) {
  return RECIPE_TAG_LABELS[tag] || tag;
}

/* =========================================================
   INIT
========================================================= */

function init() {
  initTheme();
  bindSearchEvent();
  bindCategoryEvents();
  bindTagEvents();
  bindNavigationEvents();
  bindModalEvents();
  bindThemeEvents();
  renderRecipes();
  renderTags();
  renderCategoryToolbar();
}

document.addEventListener("DOMContentLoaded", init);
