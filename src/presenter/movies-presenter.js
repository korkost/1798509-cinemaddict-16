import FilmSectionView from '../view/films-view.js';
import FilmsLisrExtraView from '../view/film-list-container-view.js';
import FilmsListTitle from '../view/films-list-title-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';
import ShowMoreView from '../view/show-more-view.js';
import PopupFilmView from './view/popup-film-view.js';
import FilmCardView from './view/film-card-view.js';
import { render } from './utils/helpers.js';
import { isPressed } from './utils/common.js';
import { FILM_CARD_COUNT_PER_STEP, Selectors } from './utils/consts.js';


export default class MovieListPresenter {
  #FilmsListContainerView = null;

  #filmsComponent = new FilmSectionView();
  #filmsListComponent = new FilmsLisrExtraView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #films = [];

  constructor(FilmsListContainerView) {
    this.#FilmsListContainerView = FilmsListContainerView;
  }

  init = (films) => {
    this.#films = [...films];

    render(this.#filmsListContainer, this.#filmsComponent);
    render(this.#filmsComponent, this.#filmsListComponent);

    this.#renderFilmsList();
  }

  #renderFilmsList = () => {
    const bodyElement = document.querySelector('body');
    render(this.#filmsListComponent, new FilmsListTitle(this.#films.length));

    if (this.#films.length){
      render(this.#filmsListComponent, this.#filmsListContainerComponent);
    }

    const renderFilm = (filmElement, film) => {
      const filmDetailsCard = new PopupFilmView(film);
      const filmCard = new FilmCardView(film);


      const removeFilmDetailsCard = () => {
        bodyElement.classList.remove('hide-overflow');
        bodyElement.removeChild(filmDetailsCard.element);
      };

      const addFilmDetailsCard = () => {
        bodyElement.classList.add('hide-overflow');
        bodyElement.appendChild(filmDetailsCard.element);
      };

      const onEscKeyDown = (evt) => {
        if (isPressed(evt)) {
          evt.preventDefault();
          removeFilmDetailsCard();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };



  #renderTask = () => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  #renderTasks = () => {
    // Метод для рендеринга N-задач за раз
  }

  #renderNoTasks = () => {
    // Метод для рендеринга заглушки
  }

  #renderLoadMoreButton = () => {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа задач,
    // сейчас в main.js является частью renderBoard
  }

  #renderBoard = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
}
