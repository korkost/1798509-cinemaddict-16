import { createElement } from '../utils/helpers.js';

const createFilmsEmptyTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class MoviesEmpty {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsEmptyTemplate();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}
