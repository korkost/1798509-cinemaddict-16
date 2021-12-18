import AbstractView from './abstract-view.js';

const createShowMoreTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView extends AbstractView {

  get template() {

    return createShowMoreTemplate();
  }

  #onShowNext = (evt) => {
    evt.preventDefault();
    this._callback.clickShowNext();
  };

  setClickHandler = (callback) => {
    this._callback.clickShowNext = callback;
    this.element
      .addEventListener('click', this.#onShowNext);
  };
}
