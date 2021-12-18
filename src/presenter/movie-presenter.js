import PopupFilmView from './view/popup-film-view.js';
import FilmCardView from './view/film-card-view.js';
import { isPressed } from './utils/common.js';
import { render } from './utils/helpers.js';

export class MoviePresenter {
  #filmListContainerComponent = null;
  #filmDetailsCardComponent = null;
  #filmCardComponent = null;
  #bodyElement = document.querySelector('body');
  #film = null;

  constructor(filmListContainer) {
    this.#filmListContainerComponent = filmListContainer;
  }

  init = (film) => {
    this.#film = film;
    this.#filmDetailsCardComponent = new PopupFilmView(this.#film);
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setShowDetailsHandler(this.#onShowDetailsHandler);
    this.#filmDetailsCardComponent.setCloseDetailsCard(this.#onClosedDetailsCardHandler);

    render(this.#filmListContainerComponent, this.#filmCardComponent, RenderPosition.BEFOREEND);
  };

  #addFilmDetailsCard = () => {
    this.#bodyElement.classList.add('hide-overflow');
    this.#bodyElement.appendChild(this.#filmDetailsCardComponent.element);
  };

  #removeFilmDetailsCard = () => {
    this.#bodyElement.classList.remove('hide-overflow');
    this.#bodyElement.removeChild(this.#filmDetailsCardComponent.element);
  };

  #onEscKeyDown = (evt) => {
    if (isPressed(evt)) {
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

}
