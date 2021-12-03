import { createProfileTemplate } from './view/profile-view.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFilmTemplate } from './view/films-list-view.js';
import { createFilmCardTemplate } from './view/film-card-view.js';
import { createShowMoreTemplate } from './view/show-more-view.js';
import { createPopupFilmTemplate } from './view/film-details-view.js';
import { FILM_CARD_COUNT, FILM_CARD_COUNT_PER_STEP } from './utils/consts.js';
import { renderTemplate } from './utils/helpers.js';
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
};

const footerElement = document.querySelector('.footer');

renderTemplate(footerElement, createPopupFilmTemplate(cards[0]));
