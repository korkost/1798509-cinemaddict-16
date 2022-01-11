import { render, remove } from './utils/helpers.js';
import { generateFilm } from './mock/structures.js';
import { COMMENTS_ARRAY } from './mock/structures.js';
import {
  FilterType,
  RenderPosition,
  Selectors,
} from './utils/consts.js';
import ProfileView from './view/profile-view.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MovieListPresenter from './presenters/movie-list-presenter.js';
import MoviesModel from './models/movies-model.js';
import CommentsModel from './models/comments-model.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenters/filter-presenter.js';
import StatisticsView from './view/statistics/statistics-view.js';
import MenuView from './view/menu-view.js';

const FILM_COUNT = 20;

const films = Array.from({ length: FILM_COUNT }, generateFilm);

const moviesModel = new MoviesModel();
moviesModel.films = films;

const commentsModel = new CommentsModel();
commentsModel.comments = COMMENTS_ARRAY;

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(Selectors.MAIN);
const siteHeaderElement = document.querySelector(Selectors.HEADER);
const siteFooterElement = document.querySelector(Selectors.FOOTER);
const siteBodyElement = document.querySelector('body');

render(siteHeaderElement, new ProfileView(), RenderPosition.BEFORE_END);

const siteMenu = new MenuView();
render(siteMainElement, siteMenu, RenderPosition.BEFORE_END);

const movieListPresenter = new MovieListPresenter(siteMainElement, siteBodyElement, moviesModel, commentsModel, filterModel);
new FilterPresenter(siteMenu, filterModel, moviesModel);

render(siteFooterElement, new NumberOfFilmsView(films), RenderPosition.BEFORE_END);

let statisticsComponent = null;

const handleSiteMenuClick = (target) => {
  const menuCurrentType = target.dataset.filter;
  const menuActive = document.querySelector(Selectors.MAIN_NAVIGATION_ITEM);
  const menuStats = document.querySelector(Selectors.MAIN_NAVIGATION_ADDITIONAL);

  switch (menuCurrentType) {
    case FilterType.ALL:
    case FilterType.WATCHLIST:
    case FilterType.HISTORY:
    case FilterType.FAVORITES:
      remove(statisticsComponent);
      movieListPresenter.destroy();
      movieListPresenter.init();
      menuStats.classList.remove('main-navigation__item--active');
      target.classList.add('main-navigation__item--active');
      break;

    case FilterType.STATS:
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.films);
      render(siteMainElement, statisticsComponent, RenderPosition.BEFORE_END);
      statisticsComponent.getCharts(moviesModel.films);
      menuActive.classList.remove('main-navigation__item--active');
      menuStats.classList.add('main-navigation__item--active');
      break;
  }
};

siteMenu.setMenuClickHandler(handleSiteMenuClick);
