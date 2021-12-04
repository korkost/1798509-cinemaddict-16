import { createElement } from '../utils/helpers.js';

const createFilmCardRatedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
  </section>`
);
export default class FilmRatedView {
  #element = null;
  #cards = null;
  constructor(cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmCardRatedTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
