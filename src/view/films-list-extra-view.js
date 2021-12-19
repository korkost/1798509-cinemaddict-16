import AbstractView from './abstract-view.js';

const createFilmsListTemplate = (extraClass) => (
  `<section class="films-list ${extraClass ? extraClass : ''}"></section>`
);

export default class FilmsLisrExtraView extends AbstractView {
  #extraClass;
  constructor(extraClass) {
    super();
    this.#extraClass = extraClass;
  }

  get template() {
    return createFilmsListTemplate(this.#extraClass);
  }
}
