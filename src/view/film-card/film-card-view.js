import { createFilmCardTemplate } from './film-card.js';
import { createElement } from '../../utils/helpers.js';
import AbstractView from '../abstract-view.js';
import { Selectors } from '../../utils/consts.js';

export default class FilmCardView extends AbstractView {
  #film = null;
  #renderedFilms = [];

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get renderedFilms() {
    return this.#renderedFilms;
  }

  createCopy() {
    const copy = createElement(this.template);

    copy.querySelector(Selectors.FILM_CARD_LINK).addEventListener('click', this.#filmClickHandler);
    copy.querySelector(Selectors.FILM_CARD_WATCHLIST).addEventListener('click', this.#watchlistClickHandler);
    copy.querySelector(Selectors.FILM_CARD_WATCHED).addEventListener('click', this.#historyClickHandler);
    copy.querySelector(Selectors.FILM_CARD_FAVORITE).addEventListener('click', this.#favoriteClickHandler);

    this.#renderedFilms.push(copy);

    return copy;
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.querySelector(Selectors.FILM_CARD_LINK).addEventListener('click', this.#filmClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector(Selectors.FILM_CARD_WATCHLIST).addEventListener('click', this.#watchlistClickHandler);
  }

  setHistoryClickHandler = (callback) => {
    this._callback.historyClick = callback;
    this.element.querySelector(Selectors.FILM_CARD_WATCHED).addEventListener('click', this.#historyClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector(Selectors.FILM_CARD_FAVORITE).addEventListener('click', this.#favoriteClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

    #historyClickHandler = (evt) => {
      evt.preventDefault();
      this._callback.historyClick();
    }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
