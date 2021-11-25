import { createProfileTemplate } from './view/profile-view.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmsTemplate } from './view/films-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreTemplate } from './view/show-more-view.js';
import { createStatisticsTemplate } from './view/statistics-view.js';
import { createFilmDetailsTemplate } from './view/film-details-view.js';
import { FILMS_COUNT} from './consts.js'
import { renderTemplate } from './helpers.js'

export const immutablePage = () => {
const header = document.querySelector('.header');
renderTemplate(header, createProfileTemplate());

const footerStatistics = document.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createStatisticsTemplate());
};

export const mutablePage = () => {
  const main = document.querySelector('.main');
  renderTemplate(main, createSiteMenuTemplate());
  renderTemplate(main, createSortTemplate());
  renderTemplate(main, createFilmsTemplate());

  const filmsList = main.querySelector('.films-list');

  const filmsListContainer = filmsList.querySelector('.films-list__container');
  for (let i = 0; i < FILMS_COUNT; ++i) {
    renderTemplate(filmsListContainer, createFilmCardTemplate());
  }

  renderTemplate(filmsList, createShowMoreTemplate());

  renderTemplate(document.body, createFilmDetailsTemplate());
};

