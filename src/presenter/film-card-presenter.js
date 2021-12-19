import PopupFilmView from '../view/popup-film-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render, replace, remove } from '../utils/helpers.js';
import { RenderPosition } from '../utils/consts.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class FilmCardPresenter {
  #filmsListContainerComponent = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;

  #footer = document.querySelector('footer');

  #changeData = null;
  #state = null;
  #film = null;

  constructor(filmsListContainer, changeData, state) {
    this.#filmsListContainerComponent = filmsListContainer;
    this.#changeData = changeData;
    this.#state = state;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(film);
    this.#filmDetailsComponent = new PopupFilmView(film);

    this.#filmCardComponent.setOpenPopupClickHandler(this.#handleOpenPopup);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchListClick);
    this.#filmDetailsComponent.setClosePopupClickHandler(this.#handleClosePopup);

    if (prevFilmComponent === null) {
      render(this.#filmsListContainerComponent, this.#filmCardComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this.#filmsListContainerComponent.element.contains(prevFilmComponent.element)) {
      replace(this.#filmCardComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);

  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsComponent);
  }

  #onEscKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this.#state.isOpen = false;
      remove(this.#filmDetailsComponent);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#film, isAlreadyWatched: !this.#film.isAlreadyWatched});
  }

  #handleWatchListClick = () => {
    this.#changeData({...this.#film, isWatchList: !this.#film.isWatchList});
  }

  #handleOpenPopup = () => {
    if (!this.#state.isOpen) {
      render(this.#footer, this.#filmDetailsComponent, RenderPosition.AFTER_END);
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', this.#onEscKeyDown);
    }
    this.#state.isOpen = true;
  }

  #handleClosePopup = () => {
    this.#state.isOpen = false;
    remove(this.#filmDetailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
}
