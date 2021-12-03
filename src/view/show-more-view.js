import { createElement } from '../utils/helpers.js';

const createShowMoreTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class ShowMore {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createShowMoreTemplate();
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}
