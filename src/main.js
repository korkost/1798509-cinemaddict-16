import SiteMenuView from './view/site-menu-view.js';
import PopupFilmView from './view/popup-film-view.js';
import FilmCardView from './view/film-card-view.js';
import SortView from './view/sort-view.js';
import ShowMoreView from './view/show-more-view.js';
import ProfileView from './view/profile-view.js';
import FilmsView from './view/films-view.js';
import LoadingView from './view/loading-view.js';
import { FILM_CARD_COUNT, FILM_CARD_COUNT_PER_STEP, Selectors } from './utils/consts.js';
import { render } from './utils/helpers.js';
import { generateCard } from './mock/film-card.js';
import { generateFilter } from './mock/filter';

const cards = Array.from({ length: FILM_CARD_COUNT }, generateCard);
const filters = generateFilter(cards);

const siteMainElement = document.querySelector(Selectors.MAIN);
const siteNavigationElement = document.querySelector(Selectors.HEADER);

render(siteMainElement, new SiteMenuView(filters));
render(siteNavigationElement, new ProfileView());
render(siteMainElement, new SortView());
render(siteMainElement, new FilmsView());

const filmMainElement = siteMainElement.querySelector(Selectors.FILM_LIST);
const filmListElement = filmMainElement.querySelector(Selectors.FILM_CONTAINER);

const renderCard = (cardListElement, card) => {
  const cardComponent = new FilmCardView(card);
  const cardPopupComponent = new PopupFilmView(card);
  const body = document.body;

  const appendPopup = () => {
    cardListElement.appendChild(cardPopupComponent.element);
  };

  const removePopup = () => {
    cardListElement.removeChild(cardPopupComponent.element);
  };

  const isPressed = (key) => key === 'Escape' || key === 'Esc';

  const onEscKeyDown = (evt) => {
    if (isPressed) {
      evt.preventDefault();
      removePopup();
      body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  cardComponent.cardClickHandler(() => {
    appendPopup();
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  });

  cardPopupComponent.popupCloseHandler(() => {
    document.removeEventListener('keydown', onEscKeyDown);
    removePopup();
    body.classList.remove('hide-overflow');
  });

  render(cardListElement, cardComponent);
};

const renderCards = () => {

  if (cards.length === 0) {
    render(filmListElement, new LoadingView());
  }

  for (let i = 0; i < Math.min(cards.length, FILM_CARD_COUNT_PER_STEP); i++) {
    renderCard(filmListElement, cards[i]);
  }

  if (cards.length > FILM_CARD_COUNT_PER_STEP) {
    let renderCount = FILM_CARD_COUNT_PER_STEP;
    render(filmMainElement, new ShowMoreView());

    const loadButton = filmMainElement.querySelector(Selectors.SHOW_MORE);
    loadButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      cards
        .slice(renderCount, renderCount + FILM_CARD_COUNT_PER_STEP)
        .forEach((card) => renderCard(filmListElement, card));

      renderCount += FILM_CARD_COUNT_PER_STEP;

      if (renderCount >= cards.length) {
        loadButton.remove();
      }
    });
  }
};
renderCards();
