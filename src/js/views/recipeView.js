import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

// importing parent class--------

import View from './view.js';
// console.log(Fraction);
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We could'nt find that recipe. Please try another one`;
  _successMessage = ``;

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');

      if (!btn) return;
      // console.log(btn);
      const updateTo = +btn.dataset.updateTo;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  renderSuccessOptional(message = this._successMessage) {
    const markup = `<div class="error">
                         <div>
                         <svg>
                             <use href="${icons}#icon-smile"></use>
                           </svg>
                         </div>
                         <p>${message}</p>
                    </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src=${this._data.image} alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    
    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
       <svg>
       <use href="${icons}#icon-user"></use>
       </svg>

    </div>
    <button class="btn--round btn--bookmark">
      <svg>
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients.map(this._generatorMarkupIngredients).join('')}
      

     </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
     Publisher of the recipe is:
      <span class="recipe__publisher">${this._data.publisher}</span>.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.source_url}"
      target="_blank"
    >
      <span>RELOAD PAGE</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _generatorMarkupIngredients(ing) {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? fracty(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;
  }
}
export default new RecipeView();
