import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';
// import icons from 'url:../img/icons.svg'; //
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './views/recipeView.js';

if (module.hot) {
  module.hot.accept();
}
// console.log(icons);
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('test');

//Render a spinner -----

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    //1. Loading spinner----
    recipeView.renderSpinner();

    //2 Update results view to mark selected search result----
    resultsView.update(model.getSearchResultsPage(1));

    //3updating bookmarks view----
    bookmarksView.update(model.state.bookmarks);

    //4 Load recipe
    await model.loadRecipe(id);

    //  5 render recipe----
    recipeView.render(model.state.recipe);

    // debugger;
  } catch (err) {
    // alert(err);
    // console.log(err);
    recipeView.renderError();
  }
};

// showRecipe();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 1.getting query from search input-----
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results-----
    searchView._clearInput();
    await model.loadSearchResults(query);

    //3. Render Result----
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    // 4. Render initial pagination buttons----
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controlSearchResults();

const controlPagination = function (goToPage) {
  console.log('Pag controller');
  console.log(goToPage);

  //3. Render new  Result----
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4. Render new pagination buttons----
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //  const recipeView  = new recipeView(model.state.recipe);
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);

  //update the recipe view
};

// controlling bookmark----

const controlAddBookmark = function () {
  // 1. add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);

  // 2.update recipe view
  recipeView.update(model.state.recipe);

  // 3 render bookmarks
  bookmarksView.render(model.state.bookmarks);
  // bookmarksView.update(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading  spinner----
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    //close form window----
    // setTimeout(function () {
    //   addRecipeView.toggleWindow();
    // }, 1000 * MODEL_CLOSE_SEC);

    //Render bookmark view-----
    bookmarksView.render(model.state.bookmarks);

    //change id in url----

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message);
  }

  // upload new recipe
};

// ['haschange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  // bookmarksView.addHandlerRender(controlAddRecipe);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
