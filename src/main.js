import ProfileView from './view/profile-view.js';
import FilmsCounterView from './view/films-counter-view';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import { FILM_CARD_COUNT, Selectors } from './utils/consts.js';
import { render } from './utils/helpers.js';
import { generateCard } from './mock/film-card.js';

const headerElement = document.querySelector(Selectors.HEADER);
const mainElement = document.querySelector(Selectors.MAIN);
const footerElement = document.querySelector(Selectors.FOOTER);
const footerStatistics = footerElement.querySelector(Selectors.FOOTER_STATISTICS);

const getAllFilms = () => {
  const filmsList = [];
  for (let i = 0; i < FILM_CARD_COUNT; i++) {
    filmsList.push(generateCard());
  }
  return filmsList;
};
const filmsFixture = getAllFilms();

render(headerElement, new ProfileView());
render(footerStatistics, new FilmsCounterView(filmsFixture));

const filmsPresenter = new FilmsListPresenter(mainElement);

filmsPresenter.init(filmsFixture);
