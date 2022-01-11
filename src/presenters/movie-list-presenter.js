import { render, remove, replace } from '../utils/helpers.js';
import {
  FilmBlocks,
  RenderPosition,
  SortType,
  UpdateType,
  UserAction,
  FilterType,
  Mode,
  FILM_COUNT
} from '../utils/consts.js';
import {
  sortDate,
  sortRating,
  sortComments,
  onEscKeyDown
} from '../utils/common.js';
import { filter } from '../utils/filter.js';
import SortView from '../view/sort-view.js';
import FilmView from '../view/film-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card/film-card-view.js';
import PopupView from '../view/popup/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';

export default class MovieListPresenter {
  #container = null;
  #popupContainer = null;
  #popupComponent = null;
  #sortComponent = null;
  #noFilmsComponent = null;
  #ShowMoreComponent = null;
  #moviesModel = null;
  #commentsModel = null;
  #filterModel = null;

  #filmsComponent = new FilmView();
  #filmMainComponent = new FilmsListContainerView(FilmBlocks.main);
  #filmTopRatedComponent = new FilmsListContainerView(FilmBlocks.topRated);
  #filmMostCommentedComponent = new FilmsListContainerView(FilmBlocks.mostCommented);
  #filmCards = new Map();

  #renderedFilmCount = FILM_COUNT.PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #mode = Mode.DEFAULT
  #filterType = FilterType.ALL;

  constructor(container, popupContainer, moviesModel, commentsModel, filterModel) {
    this.#container = container;
    this.#popupContainer = popupContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);

    this.init();
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#moviesModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortDate);
      case SortType.RATING:
        return filteredFilms.sort(sortRating);
    }

    return filteredFilms;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init = () => {
    this.#moviesModel.addObserver(this.#handleModelEvent);

    this.#renderFilmList();
  }

  destroy = () => {
    this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });

    remove(this.#sortComponent);
    remove(this.#filmsComponent);

    this.#moviesModel.removeObserver(this.#handleModelEvent);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#container, this.#sortComponent, RenderPosition.BEFORE_END);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (data, filmListElement) => {
    const prevFilmCardComponent = this.#filmCards.get(data.id);

    if (prevFilmCardComponent && filmListElement && filmListElement !== prevFilmCardComponent.element.parentNode) {
      render(filmListElement, prevFilmCardComponent.createCopy(), RenderPosition.BEFORE_END);
      return;
    }

    const filmCardComponent = new FilmCardView(data);
    this.#filmCards.set(data.id, filmCardComponent);

    filmCardComponent.setFilmClickHandler(() => {
      this.#createPopup(data, this.comments);
      this.#mode = Mode.EDITING;
    });

    filmCardComponent.setWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, 'user_details': { ...data.user_details, watchlist: !data.user_details.watchlist } }
      );
    });

    filmCardComponent.setHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...data,
          'user_details': {
            ...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null
          }
        }
      );
    });

    filmCardComponent.setFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, 'user_details': { ...data.user_details, favorite: !data.user_details.favorite } }
      );
    });

    if (!prevFilmCardComponent) {
      render(filmListElement, filmCardComponent.createCopy(), RenderPosition.BEFORE_END);
      return;
    }

    if (!filmListElement) {
      prevFilmCardComponent.renderedFilms.forEach((film) => {
        replace(filmCardComponent.createCopy(), film);
      });
    }

    remove(prevFilmCardComponent);
  };

  #createPopup = (data, comments) => {
    const escKeyDownHandler = (evt) => {
      onEscKeyDown(evt, () => {
        this.#closePopup(data);
        document.removeEventListener('keydown', escKeyDownHandler);
        this.#mode = Mode.DEFAULT;
      });
    };

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView(data, comments);
    render(this.#popupContainer, this.#popupComponent, RenderPosition.BEFORE_END);

    this.#popupContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', escKeyDownHandler);

    this.#popupComponent.setPopupClickHandler(() => {
      this.#closePopup(data);
      document.removeEventListener('keydown', escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    });

    this.#popupComponent.setPopupWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, 'user_details': { ...data.user_details, watchlist: !data.user_details.watchlist } }
      );
    });

    this.#popupComponent.setPopupHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...data,
          'user_details': {
            ...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null
          }
        }
      );
    });

    this.#popupComponent.setPopupFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, 'user_details': { ...data.user_details, favorite: !data.user_details.favorite } }
      );
    });

    this.#popupComponent.setDeleteCommentClickHandler((id) => {
      this.#handleViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.COMMENT,
        comments.find((comment) => comment.id === id),
      );
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, comments: data.comments.filter((comment) => comment !== id) },
      );
    });

    this.#popupComponent.setAddCommentKeydownHandler((comment, id) => {
      this.#handleViewAction(
        UserAction.ADD_COMMENT,
        UpdateType.COMMENT,
        comment,
      );
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        { ...data, comments: data.comments.concat([...id]) },
      );
    });

    if (prevPopupComponent !== null && this.#mode === Mode.EDITING) {
      const scrollPoint = prevPopupComponent.element.scrollTop;
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scrollTop = scrollPoint;

      this.#popupComponent.userEmoji = prevPopupComponent.userEmoji;
      this.#popupComponent.userComment = prevPopupComponent.userComment;
      this.#popupComponent.saveUserData();
    }

    remove(prevPopupComponent);
  }

  #closePopup = (data) => {
    this.#popupComponent.reset(data);
    remove(this.#popupComponent);
    this.#popupContainer.classList.remove('hide-overflow');
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.COMMENT:
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderFilm(data);
        this.#renderFilmList();
        if (this.#mode === Mode.EDITING) {
          this.#createPopup(data, this.comments);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderFilmList();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderFilmList();
  }

  #renderFilms = (films, container) => {
    films.forEach((film) => this.#renderFilm(film, container));
  }

  #handlerShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT.PER_STEP);

    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);
    this.#renderFilms(films, this.#filmMainComponent.container);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#ShowMoreComponent);
    }
  }

  #renderShowMoreButton = () => {
    this.#ShowMoreComponent = new ShowMoreButtonView();
    this.#ShowMoreComponent.setClickHandler(this.#handlerShowMoreButtonClick);
    render(this.#filmMainComponent, this.#ShowMoreComponent, RenderPosition.BEFORE_END);
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmView(this.#filterType);
    render(this.#container, this.#noFilmsComponent, RenderPosition.BEFORE_END);
  }

  #renderExtraFilms = () => {
    const topFilms = this.films
      .filter((film) => film.film_info.total_rating > 0)
      .sort(sortRating)
      .slice(0, FILM_COUNT.EXTRA);

    const commentedFilms = this.films
      .filter((film) => film.comments.length > 0)
      .sort(sortComments)
      .slice(0, FILM_COUNT.EXTRA);

    this.#filmTopRatedComponent = new FilmsListContainerView(FilmBlocks.topRated);
    this.#filmMostCommentedComponent = new FilmsListContainerView(FilmBlocks.mostCommented);

    if (topFilms.length > 0 && this.#filmTopRatedComponent) {
      render(this.#filmsComponent, this.#filmTopRatedComponent, RenderPosition.BEFORE_END);
      this.#renderFilms(topFilms, this.#filmTopRatedComponent.container);
    }

    if (commentedFilms.length > 0 && this.#filmMostCommentedComponent) {
      render(this.#filmsComponent, this.#filmMostCommentedComponent, RenderPosition.BEFORE_END);
      this.#renderFilms(commentedFilms, this.#filmMostCommentedComponent.container);
    }
  }

  #clearBoard = ({ resetRenderedFilmCount = false, resetSortType = false } = {}) => {
    const filmCount = this.films.length;

    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#ShowMoreComponent);
    remove(this.#filmMainComponent);
    remove(this.#filmTopRatedComponent);
    remove(this.#filmMostCommentedComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT.PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderFilmList = () => {
    const films = this.films;
    const filmCount = films.length;

    this.#renderSort();
    render(this.#container, this.#filmsComponent, RenderPosition.BEFORE_END);
    render(this.#filmsComponent, this.#filmMainComponent, RenderPosition.BEFORE_END);

    if (filmCount === 0) {
      remove(this.#sortComponent);
      this.#renderNoFilms();
      return;
    }

    this.#renderFilms(films.slice(0, this.#renderedFilmCount), this.#filmMainComponent.container);

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderExtraFilms();
  }
}
