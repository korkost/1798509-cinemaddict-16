import AbstractView from './abstract-view.js';

const createShowMoreTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {

  get template() {

    return createShowMoreTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.addCards = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (e) => {
    e.preventDefault();
    this._callback.addCards();
  };
}
