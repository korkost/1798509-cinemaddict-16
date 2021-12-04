import SiteMenuView from './view/site-menu-view.js';
import PopupFilmView from './view/popup-film-view.js';
import FilmCardView from './view/film-card-view.js';
import FilterSortView from './view/filter-sort-view.js';
import SortView from './view/sort-view.js';
import ShowMoreView from './view/show-more-view.js';
import ProfileView from './view/profile-view.js';
import FilmsView from './view/films-view.js';
import LoadingView from './view/loading-view.js';
import StatisticView from './view/statistics-view';
import FilmEmpyt from './view/film-empty';
import { FILM_CARD_COUNT, FILM_CARD_COUNT_PER_STEP } from './utils/consts.js';
import { render } from './utils/helpers.js';
import { generateCard } from './mock/film-card.js';
import { generateFilter } from './mock/filter';

const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.header');

renderTemplate(siteMainElement, createSiteMenuTemplate(filters));
renderTemplate(siteNavigationElement, createProfileTemplate());
renderTemplate(siteMainElement, createSortTemplate());
renderTemplate(siteMainElement, createFilmTemplate());

const filmMainElement = siteMainElement.querySelector('.films-list');
const filmListElement = filmMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
  renderTemplate(filmListElement, createFilmCardTemplate(cards[i]));
}

if (cards.length > FILM_CARD_COUNT_PER_STEP) {
  let renderCount = FILM_CARD_COUNT_PER_STEP;
  renderTemplate(filmMainElement, createShowMoreTemplate());

  const loadButton = filmMainElement.querySelector('.films-list__show-more');
  loadButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderCount, renderCount + FILM_CARD_COUNT_PER_STEP)
      .forEach((card) => renderTemplate(filmListElement, createFilmCardTemplate(card)));

    renderCount += FILM_CARD_COUNT_PER_STEP;

    if (renderCount >= cards.length) {
      loadButton.remove();
    }
  });
}

const footerElement = document.querySelector('.footer');

renderTemplate(footerElement, createPopupFilmTemplate(cards[0]));
