import { date } from '../utils/helpers.js';
import { createElement } from '../utils/helpers.js';
import { controlsItemButton } from './popup-film-view.js';

const createFilmCardTemplate = ({
  title,
  description,
  img,
  genre,
  rating,
  colorRating,
  releaseDate,
  duration,
  countComment,
}) => {

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating film-card__rating--${colorRating}">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date(releaseDate)}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="./images/posters/${img}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}tr…</p>
          <span class="film-card__comments">${countComment} comments</span>
      </a>
        <div class="film-card__controls">
          ${controlsItemButton}
        </div>
    </article>`
  );
};

export default class FilmCardView {
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
    return createFilmCardTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
