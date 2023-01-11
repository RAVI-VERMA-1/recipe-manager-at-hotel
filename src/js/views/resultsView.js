import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `We could'nt find that recipe. 🙌 Please try again`;
  _successMessage = ``;
  // _generateMarkup() {
  //   // console.log(this._data);

  //   return this._data.map(this._generateMarkupPreview).join('');
  // }

  _generateMarkup() {
    // console.log(this._data);

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();
