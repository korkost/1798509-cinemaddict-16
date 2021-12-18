import FilmSectionView from '../view/films-view.js';
import FilmsLisrExtraView from '../view/film-list-container-view.js';
import FilmsListTitle from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';
import ShowMoreView from '../view/show-more-view.js';
import MoviePresenter from './movie-presenter.js';
import { render, remove } from '../utils/helpers.js';
import { FILM_CARD_COUNT_PER_STEP } from '../utils/consts.js';

export default class MovieListPresenter {
  #mainContainer = null;
  #filmsComponent = new FilmSectionView();
  #filmsListComponent = new FilmsLisrExtraView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #renderFilmCount = FILM_CARD_COUNT_PER_STEP;
  #showMoreButtonComponent = new ShowMoreView();
  #filmPresenterMap = new Map();
  #films = [];

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#mainContainer, this.#filmsComponent);
    render(this.#filmsComponent, this.#filmsListComponent);

    this.#renderMovieList();
  }

  #onFilmChange = (updatedFilm) => {
    this.#films = this.#films.map((film) => film.id === updatedFilm.id ? updatedFilm : film);
    this.#filmPresenterMap.get(updatedFilm.id).init(updatedFilm);
  };

  #clearFilmList = () => {
    this.#filmPresenterMap.forEach((presenter) => presenter.destroy());
    this.#filmPresenterMap.clear();
    this.#renderFilmCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderFilm = (film) => {
    const movePresenter = new MoviePresenter(this.#filmsListContainerComponent, this.#onFilmChange);
    movePresenter.init(film);
    this.#filmPresenterMap.set(film.id, movePresenter);
  };

  #renderFilms = (from, to) => {
    for (const film of this.#films.slice(from, to)) {
      this.#renderFilm(film);
    }
  };

  #onShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderFilmCount, this.#renderFilmCount + FILM_CARD_COUNT_PER_STEP);
    this.#renderFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
    render(this.#filmsListComponent, this.#showMoreButtonComponent);
  };

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#films.length, FILM_CARD_COUNT_PER_STEP));

    if (this.#films.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderMovieList = () => {
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length));

    if (this.#films.length === 0){
      return;
    }

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent);
    }

    this.#renderFilmsList();

  };
}
