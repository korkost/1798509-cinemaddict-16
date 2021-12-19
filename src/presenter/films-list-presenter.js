import SortView from '../view/sort-view';
import SiteMenuView from '../view/site-menu-view';
import FilmsView from '../view/films-view.js';
import FilmsLisrExtraView from '../view/films-list-extra-view.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';
import ShowMoreView from '../view/show-more-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import { render, remove, updateItem } from '../utils/helpers.js';
import { generateFilter } from '../mock/filter';
import { FILM_CARD_COUNT_PER_STEP, RenderPosition, SortType } from '../utils/consts.js';
import dayjs from 'dayjs';

export default class FilmsListPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = null;
  #filmsListContainerComponent = null;
  #showMoreButtonComponent = new ShowMoreView();
  #sortComponent = new SortView();
  #filtersComponent = null;

  #mainContainer = null;

  #state = {
    isOpen: false,
  };

  #renderFilmCount = FILM_CARD_COUNT_PER_STEP;
  #filmsData = [];
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourceFilmsData = [];

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (films) => {
    this.#filmsData = films;
    this.#sourceFilmsData = [...films];
    this.#filtersComponent = new SiteMenuView(generateFilter(this.#filmsData));

    this.#renderFilters();
    this.#renderSort();

    this.#renderFilmsSection();
  }

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.BY_DATE: {
        this.#filmsData.sort((a, b) => dayjs(a.release.date).year() > dayjs(b.release.date).year() ? 1 : -1);
        break;
      }
      case SortType.BY_RATING: {
        this.#filmsData.sort((a, b) => a.rating > b.rating ? 1 : -1);
        break;
      }
      default: {
        this.#filmsData = [...this.#sourceFilmsData];
      }
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  }

  #renderSort = () => {
    render(this.#mainContainer, this.#sortComponent, RenderPosition.BEFORE_END);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderFilters = () => {
    render(this.#mainContainer, this.#filtersComponent, RenderPosition.BEFORE_END);
  }

  #handleFilmChange = (updatedFilm) => {
    this.#filmsData = updateItem(this.#filmsData, updatedFilm);
    this.#sourceFilmsData = updateItem(this.#sourceFilmsData, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmCardPresenter(this.#filmsListContainerComponent, this.#handleFilmChange, this.#state);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #clearFilmsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderFilmCount = FILM_CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #renderFilms = (from, to) => {
    this.#filmsData
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderFilmCount, this.#renderFilmCount + FILM_CARD_COUNT_PER_STEP);
    this.#renderFilmCount += FILM_CARD_COUNT_PER_STEP;

    if (this.#renderFilmCount >= this.#filmsData.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmsListContainerComponent, this.#showMoreButtonComponent, RenderPosition.AFTER_END);

    this.#showMoreButtonComponent.setAddCardsClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderFilmsList = () => {
    this.#renderFilms(0, Math.min(this.#filmsData.length, FILM_CARD_COUNT_PER_STEP));

    if (this.#filmsData.length > FILM_CARD_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderNoFilms = (filmsList) => {
    if (this.#filmsData.length === 0) {
      render(filmsList, new FilmsListTitleView('There are no movies in our database'), RenderPosition.BEFORE_END);
    }
  }

  #renderFilmsListSection = () => {
    this.#filmsListComponent = new FilmsLisrExtraView();
    this.#renderNoFilms(this.#filmsListComponent);
    render(this.#filmsComponent, this.#filmsListComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsListContainer = () => {
    this.#filmsListContainerComponent = new FilmsListContainerView();
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsSection = () => {
    render(this.#mainContainer, this.#filmsComponent, RenderPosition.BEFORE_END);
    this.#renderFilmsListSection();
    this.#renderFilmsListContainer();

    this.#renderFilmsList();
  }
}
