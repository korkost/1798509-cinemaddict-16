import AbstractView from './abstract-view.js';
import { Selectors } from '../utils/consts.js';

const createFilmListContainerTemplate = ({title, isTitleHidden, isExtra, isEmpty}) => (
  `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isTitleHidden ? 'visually-hidden' : ''}">${title}</h2>

    ${!isEmpty ? '<div class="films-list__container"></div>' : ''}
  </section>`
);

export default class FilmsListContainerView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilmListContainerTemplate(this.#films);
  }

  get container() {
    return this.element.querySelector(Selectors.FILM_CONTAINER);
  }
}
