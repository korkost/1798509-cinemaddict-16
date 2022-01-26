import { render, remove } from './utils/helpers.js';
import {
  FilterType,
  RenderPosition,
  Selectors,
} from './utils/consts.js';
import NumberOfFilmsView from './view/number-of-films-view.js';
import MovieListPresenter from './presenters/movie-list-presenter.js';
import MoviesModel from './models/movies-model.js';
import CommentsModel from './models/comments-model.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenters/filter-presenter.js';
import StatisticsView from './view/statistics/statistics-view.js';
import MenuView from './view/menu-view.js';
import ApiService from './services/api-service.js';

const AUTHORIZATION = 'Basic fbgf34jbdfhvjdvbd';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector(Selectors.MAIN);
const siteFooterElement = document.querySelector(Selectors.FOOTER);

const apiService = new ApiService(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel(apiService);
const commentsModel = new CommentsModel(apiService);
const filterModel = new FilterModel();
const siteMenu = new MenuView();

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, commentsModel, filterModel, apiService);
new FilterPresenter(siteMenu, filterModel, moviesModel);

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

    default:
      if (statisticsComponent) {
        remove(statisticsComponent);
        menuStats.classList.remove('main-navigation__item--active');
      }
      movieListPresenter.destroy();
      movieListPresenter.init();
      break;
  }
};

siteMenu.setMenuClickHandler(handleSiteMenuClick);

const numberOfFilms = new NumberOfFilmsView(moviesModel.films);
render(siteFooterElement, numberOfFilms, RenderPosition.BEFORE_END);

moviesModel.init().finally(() => {
  render(siteMainElement, siteMenu, RenderPosition.AFTER_BEGIN);
  remove(numberOfFilms);
  render(siteFooterElement, new NumberOfFilmsView(moviesModel.films), RenderPosition.BEFORE_END);
  siteMenu.setMenuClickHandler(handleSiteMenuClick);
});
