import FilmSectionView from '../view/films-view.js';
import FilmsLisrExtraView from '../view/film-list-container-view.js';
import FilmsListTitle from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';
import ShowMoreView from '../view/show-more-view.js';
import PopupFilmView from './view/popup-film-view.js';
import FilmCardView from './view/film-card-view.js';
import { render } from './utils/helpers.js';
import { isPressed } from './utils/common.js';
import { FILM_CARD_COUNT_PER_STEP, Selectors } from './utils/consts.js';


export default class MovieListPresenter {
  #FilmsListContainerView = null;

  #filmsComponent = new FilmSectionView();
  #filmsListComponent = new FilmsLisrExtraView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #films = [];

  constructor(FilmsListContainerView) {
    this.#FilmsListContainerView = FilmsListContainerView;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#filmsListContainer, this.#filmsComponent);
    render(this.#filmsComponent, this.#filmsListComponent);

    this.#renderFilmsList();
  }

  #renderFilmsList = () => {
    const bodyElement = document.querySelector('body');
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length));

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent);
    }

    const renderFilm = (filmElement, film) => {
      const filmDetailsCard = new PopupFilmView(film);
      const filmCard = new FilmCardView(film);


      const removeFilmDetailsCard = () => {
        bodyElement.classList.remove('hide-overflow');
        bodyElement.removeChild(filmDetailsCard.element);
      };

      const addFilmDetailsCard = () => {
        bodyElement.classList.add('hide-overflow');
        bodyElement.appendChild(filmDetailsCard.element);
      };

      const onEscKeyDown = (evt) => {
        if (isPressed(evt)) {
          evt.preventDefault();
          removeFilmDetailsCard();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      filmCard.setShowDetailsHandler(() => {
        addFilmDetailsCard();
        document.addEventListener('keydown', onEscKeyDown);
      });

      filmDetailsCard.setCloseDetailsCard(() => {
        removeFilmDetailsCard();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      render(filmElement, filmCard);
    };

    for (const film of this.#films.slice(0, FILM_CARD_COUNT_PER_STEP)) {
      renderFilm(this.#filmsListContainerComponent, film);
    }

    if (this.#films.length > FILM_CARD_COUNT_PER_STEP) {
      let renderFilmCount = FILM_CARD_COUNT_PER_STEP;

      const showMoreButton = new ShowMoreView();
      render(this.#filmsListComponent, showMoreButton);
      const showMoreElement = this.#filmsListComponent.element.querySelector(Selectors.SHOW_MORE);

      showMoreElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#films
          .slice(renderFilmCount, renderFilmCount + FILM_CARD_COUNT_PER_STEP)
          .forEach((film) => {
            renderFilm(this.#filmsListContainerComponent, film);
          });

        renderFilmCount += FILM_CARD_COUNT_PER_STEP;

        if (renderFilmCount >= this.#films.length) {
          showMoreElement.remove();
        }
      });
    }
  };
}
