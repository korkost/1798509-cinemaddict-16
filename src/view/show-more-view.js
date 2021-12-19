import AbstractView from './abstract-view.js';

const createShowMoreTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView extends AbstractView {

  get template() {

    return createShowMoreTemplate();
  }

  setAddCardsClickHandler = (callback) => {
    this._callback.addCards = callback;
    this.element.addEventListener('click', this.#addCardsClickHandler);
  }

  #addCardsClickHandler = (e) => {
    e.preventDefault();
    this._callback.addCards();
  };
}
