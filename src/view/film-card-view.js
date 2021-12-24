import { date } from '../utils/task.js';
import cn from 'classnames';
import AbstractView from './abstract-view.js';
import { Selectors, SHORT_DESC_LENGTH } from '../utils/consts.js';

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
  isWatchlist,
  isAlreadyWatched,
  isFavorite
}) => {

  const classesWatchlist = cn(
    'film-card__controls-item',
    'film-card__controls-item--add-to-watchlist', {
      'film-card__controls-item--active': isWatchlist
    });

  const classesWatched = cn(
    'film-card__controls-item',
    'film-card__controls-item--mark-as-watched', {
      'film-card__controls-item--active': isAlreadyWatched,
    });

  const classesFavorite = cn(
    'film-card__controls-item',
    'film-card__controls-item--favorite', {
      'film-card__controls-item--active': isFavorite
    });

  const controlsItemButton = (
    `<button class="film-card__controls-item ${classesWatchlist}"
  type="button">
  Add to watchlist
  </button>

  <button class="film-card__controls-item ${classesWatched}"
  type="button"
  >Mark as watched
  </button>

  <button class="film-card__controls-item ${classesFavorite}"
  type="button">
  Mark as favorite
  </button>`
  );

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
          <p class="film-card__description">${(description.length <= SHORT_DESC_LENGTH) ? description : description.slice(0, SHORT_DESC_LENGTH) + '...'}</p>
          <span class="film-card__comments">${countComment} comments</span>
      </a>
        <div class="film-card__controls">
          ${controlsItemButton}
        </div>
  </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #cards;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {

    return createFilmCardTemplate(this.#cards);
  }
  setOpenPopupClickHandler = (callback) => {
    this._callback.openPopup = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#openPopupHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #openPopupHandler = (e) => {
    e.preventDefault();
    this._callback.openPopup();
  }
}
