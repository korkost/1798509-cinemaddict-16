import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { FILM_CARD_COUNT, Selectors } from './utils/consts.js';
import { render } from './utils/helpers.js';
import { MovieListPresenter } from './presenter/movie-list-presenter.js';
import { generateCard } from './mock/film-card.js';
import { generateFilter } from './mock/filter.js';
import { generateProfile } from './mock/profile.js';

const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);
const profile = generateProfile();

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector(Selectors.HEADER);
const mainElement = bodyElement.querySelector(Selectors.MAIN);
const footerElement = bodyElement.querySelector(Selectors.FOOTER);
const footerStatisticElement = footerElement.querySelector(Selectors.FOOTER_STATISTICS)

render(mainElement, new SiteMenuView().element);

const navigationElement = mainElement.querySelector(Selectors.MAIN_NAVIGATION);
render(navigationElement, new SiteMenuView(filters).element);

const movieListPresenter = new MovieListPresenter(mainElement);

if (cards.length) {
  render(headerElement, new ProfileView(profile).element);
  render(navigationElement, new SortView().element, RenderPosition.AFTER_END);
}

movieListPresenter.init(films);

render(footerStatisticElement, new FooterStatisticsView(cards.length).element);
