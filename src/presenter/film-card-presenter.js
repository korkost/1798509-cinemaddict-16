import PopupFilmView from '../view/popup-film-view.js';
import FilmCardView from '../view/film-card-view.js';
import { render, replace, remove } from '../utils/helpers.js';
import { RenderPosition } from '../utils/consts.js';

export default class FilmCardPresenter {
  #filmsListContainerComponent = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;

  #footer = document.querySelector('footer');

  #changeData = null;
  #state = null;
  #card = null;

  constructor(filmsListContainer, changeData, state) {
    this.#filmsListContainerComponent = filmsListContainer;
    this.#changeData = changeData;
    this.#state = state;
  }

  init = (card) => {
    this.#card = card;

    const prevFilmComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(card);
    this.#filmDetailsComponent = new PopupFilmView(card);

    this.#filmCardComponent.setOpenPopupClickHandler(this.#handleOpenPopup);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
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
    this.#changeData({...this.#card, isFavorite: !this.#card.isFavorite});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#card, isAlreadyWatched: !this.#card.isAlreadyWatched});
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#card, isWatchlist: !this.#card.isWatchlist});
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
