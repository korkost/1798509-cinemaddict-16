import { render, remove, replace } from '../utils/helpers.js';
import {
  FilmBlocks,
  RenderPosition,
  SortType,
  UpdateType,
  UserAction,
  FilterType,
  State,
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
import FilmsView from '../view/films-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card/film-card-view.js';
import PopupView from '../view/popup/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import NoFilmView from '../view/no-film-view.js';
import LoadingView from '../view/loading-view.js';
import ProfileView from '../view/profile-view.js';

export default class MovieListPresenter {
  #container = null;
  #filmCardComponent = null;
  #popupComponent = null;
  #sortComponent = null;
  #noFilmsComponent = null;
  #buttonShowMoreComponent = null;
  #moviesModel = null;
  #commentsModel = null;
  #filterModel = null;
  #api = null;
  #filmId = null;
  #profile = null;
  #film = null;

  #filmsComponent = new FilmsView();
  #filmMainComponent = new FilmsListContainerView(FilmBlocks.main);
  #filmTopRatedComponent = new FilmsListContainerView(FilmBlocks.topRated);
  #filmMostCommentedComponent = new FilmsListContainerView(FilmBlocks.mostCommented);
  #loadingComponent = new LoadingView();
  #filmCards = new Map();

  #renderedFilmCount = FILM_COUNT.PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #mode = Mode.DEFAULT
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(container, moviesModel, commentsModel, filterModel, api) {
    this.#container = container;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#api = api;

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

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    this.#renderFilmList();
  }

  destroy = () => {
    this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});

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

    this.#filmCardComponent = new FilmCardView(data);
    this.#filmCards.set(data.id, this.#filmCardComponent);

    this.#filmCardComponent.setFilmClickHandler(() => {
      this.#openPopup(data);
      this.#mode = Mode.EDITING;
    });

    this.#filmCardComponent.setWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}}
      );
    });

    this.#filmCardComponent.setHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data,
          'user_details': {...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null}}
      );
    });

    this.#filmCardComponent.setFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}}
      );
    });

    if (!prevFilmCardComponent) {
      render(filmListElement, this.#filmCardComponent.createCopy(), RenderPosition.BEFORE_END);
      return;
    }

    if (!filmListElement) {
      prevFilmCardComponent.renderedFilms.forEach((film) => {
        replace(this.#filmCardComponent.createCopy(), film);
      });
    }

    remove(prevFilmCardComponent);
  };

  #openPopup = (data) => {
    this.#api.getComments(data.id)
      .then((comments) => {
        this.#commentsModel.comments = comments;
        this.#createPopup(data, this.#commentsModel.comments);
      })
      .catch(() => {
        this.#setViewState(State.ABORTING);
      });
  }

  #escKeyDownHandler = (evt) => {
    onEscKeyDown(evt, () => {
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = Mode.DEFAULT;
    });
  };

  #createPopup = (data, comments) => {
    this.#filmId = data.id;

    const commentsID = comments.map((item) => item.id);
    this.#film = data;
    this.#film.comments = commentsID;

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView(data, comments);
    render(document.body, this.#popupComponent, RenderPosition.BEFORE_END);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#popupComponent.setPopupClickHandler(() => {
      this.#popupComponent.reset(data);
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);

      this.#mode = Mode.DEFAULT;
    });

    this.#popupComponent.setPopupWatchlistClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, watchlist: !data.user_details.watchlist}}
      );
    });

    this.#popupComponent.setPopupHistoryClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data,
          'user_details': {...data.user_details,
            'already_watched': !data.user_details.already_watched,
            'watching_date': !data.user_details.already_watched ? new Date() : null}}
      );
    });

    this.#popupComponent.setPopupFavoriteClickHandler(() => {
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, 'user_details': {...data.user_details, favorite: !data.user_details.favorite}}
      );
    });

    this.#popupComponent.setDeleteCommentClickHandler((id) => {
      this.#handleViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.DELETE,
        comments.find((comment) => comment.id === id),
      );
      this.#handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...data, comments: data.comments.filter((comment) => comment !== id)},
      );
    });

    this.#popupComponent.setAddCommentKeydownHandler((comment) => {
      this.#handleViewAction(
        UserAction.ADD_COMMENT,
        UpdateType.ADD,
        comment,
      );

      this.#handleViewAction(
        UserAction,
        UpdateType.MINOR,
        {...data, comments: data.comments.push(comment.id)},
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

  #closePopup = () => {
    this.#filmId = null;
    this.#commentsModel.comments = [];
    document.body.classList.remove('hide-overflow');
    remove(this.#popupComponent);
    this.#popupComponent = null;
  };

  #setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this.#popupComponent.updateData({
        isDisabled: false,
      });
    };

    switch (state) {
      case State.ADDING:
        this.#popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this.#popupComponent.updateData({
          isDisabled: true,
        });
        break;
      case State.ABORTING:
        this.#filmCardComponent.shake(resetFormState);
        this.#popupComponent.shake(resetFormState);
        break;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#moviesModel.updateFilm(updateType, update);
        } catch(error) {
          this.#setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#setViewState(State.ADDING);
        try {
          await this.#commentsModel.addComment(updateType, update, this.#filmId);
          this.#popupComponent.reset(this.#film);
        }
        catch(error) {
          this.#setViewState(State.ABORTING);
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#setViewState(State.DELETING);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(error) {
          this.#setViewState(State.ABORTING);
        }
        break;
      default:
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.DELETE:
        break;
      case UpdateType.ADD:
        this.#clearBoard();
        this.#renderFilm(this.#film);
        this.#renderFilmList();
        if (this.#mode === Mode.EDITING) {
          this.#openPopup(this.#film);
        }
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderFilm(data);
        this.#renderFilmList();
        if (this.#mode === Mode.EDITING) {
          this.#openPopup(data);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount +  FILM_COUNT.PER_STEP);

    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);
    this.#renderFilms(films, this.#filmMainComponent.container);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      remove(this.#buttonShowMoreComponent);
    }
  }

  #renderShowMoreButton = () => {
    this.#buttonShowMoreComponent = new ShowMoreButtonView();
    this.#buttonShowMoreComponent.setClickHandler(this.#handlerShowMoreButtonClick);
    render(this.#filmMainComponent, this.#buttonShowMoreComponent, RenderPosition.BEFORE_END);
  }

  #renderLoading = () => {
    render(this.#filmMainComponent, this.#loadingComponent, RenderPosition.AFTER_BEGIN);
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmView(this.#filterType);
    render(this.#container, this.#noFilmsComponent, RenderPosition.BEFORE_END);
    remove(this.#loadingComponent);
  }

  #renderProfile = () => {
    remove(this.#profile);
    this.#profile = new ProfileView(this.#moviesModel.films);
    render(document.querySelector('.header'), this.#profile, RenderPosition.BEFORE_END);
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

  #clearBoard = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    remove(this.#sortComponent);
    remove(this.#noFilmsComponent);
    remove(this.#buttonShowMoreComponent);
    remove(this.#filmMainComponent);
    remove(this.#filmTopRatedComponent);
    remove(this.#filmMostCommentedComponent);
    remove(this.#loadingComponent);

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
    if (this.#isLoading) {
      this.#renderLoading();
    } else {
      remove(this.#loadingComponent);
      this.#renderSort();
    }

    const films = this.films;
    const filmCount = films.length;

    this.#renderProfile();

    render(this.#container, this.#filmsComponent, RenderPosition.BEFORE_END);
    render(this.#filmsComponent, this.#filmMainComponent, RenderPosition.BEFORE_END);

    if (filmCount === 0 && !this.#isLoading) {
      remove(this.#sortComponent);
      this.#renderNoFilms();
    }else {
      remove(this.#noFilmsComponent);
    }

    this.#renderFilms(films.slice(0, this.#renderedFilmCount), this.#filmMainComponent.container);

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }

    this.#renderExtraFilms();
  }
}
