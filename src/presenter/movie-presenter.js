import PopupFilmView from '../view/popup-film-view.js';
import FilmCardView from '../view/film-card-view.js';
import { isPressed } from '../utils/common.js';
import { render, replace, remove } from '../utils/helpers.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class MoviePresenter {
  #filmListContainerComponent = null;
  #filmDetailsCardComponent = null;
  #filmCardComponent = null;
  #bodyElement = document.querySelector('body');
  #changeData = null;
  #mode = Mode.DEFAULT;
  #film = null;

  constructor(filmListContainer, changeData) {
    this.#filmListContainerComponent = filmListContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevfilmCardComponent = this.#filmCardComponent;
    const prevfilmDetailsCardComponent = this.#filmDetailsCardComponent;

    this.#filmDetailsCardComponent = new PopupFilmView(this.#film);
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setShowDetailsHandler(this.#onShowDetailsHandler);
    this.#filmCardComponent.setAddToWatchListHandler(this.#onAddToWatchList);
    this.#filmCardComponent.setMarkAsWatchedHandler(this.#onMarkAsWatched);
    this.#filmCardComponent.setMarkAsFavoriteHandler(this.#onMarkAsFavorite);

    this.#filmDetailsCardComponent.setCloseDetailsCardHandler(this.#onClosedDetailsCardHandler);
    this.#filmDetailsCardComponent.setAddToWatchListHandler(this.#onAddToWatchList);
    this.#filmDetailsCardComponent.setMarkAsWatchedHandler(this.#onMarkAsWatched);
    this.#filmDetailsCardComponent.setMarkAsFavoriteHandler(this.#onMarkAsFavorite);

    if (prevfilmCardComponent === null || prevfilmDetailsCardComponent === null) {
      render(this.#filmListContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevfilmCardComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#filmCardComponent, prevfilmCardComponent);
      replace(this.#filmDetailsCardComponent, prevfilmDetailsCardComponent);
    }

    remove(prevfilmCardComponent);
    remove(prevfilmDetailsCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsCardComponent);
  }

  #addFilmDetailsCard = () => {
    this.#bodyElement.classList.add('hide-overflow');
    this.#bodyElement.appendChild(this.#filmDetailsCardComponent.element);
    this.#mode = Mode.EDITING;
  };

  #removeFilmDetailsCard = () => {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#bodyElement.removeChild(this.#filmDetailsCardComponent.element);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#removeFilmDetailsCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onShowDetailsHandler = () => {
    this.#addFilmDetailsCard();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onClosedDetailsCardHandler = () => {
    this.#removeFilmDetailsCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onAddToWatchList = () => {
    this.#changeData({ ...this.#film, isWatch: !this.#film.isWatch });
  };

  #onMarkAsWatched = () => {
    this.#changeData({ ...this.#film, isHistory: !this.#film.isHistory });
  };

  #onMarkAsFavorite = () => {
    this.#changeData({ ...this.#film, isFavorites: !this.#film.isFavorites });
  };

}
