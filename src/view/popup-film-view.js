import { datePopup, fullDate } from '../utils/task.js';
import AbstractView from './abstract-view.js';
import { Selectors } from '../utils/consts.js';
import cn from 'classnames';

const createCommentsList = (comments) => {

  const { commentImg, comment, commentName, releaseDate } = comments;

  return (
    `<li li class="film-details__comment" >
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${commentImg}" width="55" height="55" alt="emoji-smile">
    </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${commentName}</span>
          <span class="film-details__comment-day">${fullDate(releaseDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createPopupFilmTemplate = (film) => {

  const {
    id,
    title,
    description,
    img,
    genre,
    country,
    rating,
    director,
    actors,
    writers,
    colorRating,
    releaseDate,
    duration,
    originalTitle,
    ageRating,
    commentCount,
    isWatchlist,
    isAlreadyWatched,
    isFavorite,
  } = film;

  const classesWatchlist = cn(
    'film-card__controls-item',
    'film-card__controls-item--add-to-watchlist', {
      'film-card__controls-item--active': isWatchlist
    });

  const classesWatched = cn(
    'film-card__controls-item',
    'film-card__controls-item--mark-as-watched', {
      'film-card__controls-item--active': isAlreadyWatched
    });

  const classesFavorite = cn(
    'film-card__controls-item',
    'film-card__controls-item--favorite', {
      'film-card__controls-item--active': isFavorite
    });

  const controlsItemButton = (
    `<button class="film-card__controls-item ${classesWatchlist}"
  type="button">
  Add to watchlist
  </button>

  <button class="film-card__controls-item ${classesWatched}"
  type="button"
  >Mark as watched
  </button>

  <button class="film-card__controls-item ${classesFavorite}"
  type="button">
  Mark as favorite
  </button>`
  );

  return (
    `<section class="film-details" >
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div id="${id}" class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${img}" alt="${title}">
                <p class="film-details__age">${ageRating}</p>
        </div>
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${originalTitle}</p>
                  </div>
                  <div class="film-details__rating ${colorRating}">
                    <p class="film-details__total-rating ">${rating}</p>
                  </div>
                </div>
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${datePopup(releaseDate)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${duration}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${genre}</span>
                      <span class="film-details__genre">${genre}</span>
                      <span class="film-details__genre">${genre}</span></td></td>
            </tr>
          </table>
              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
          <section id="${id}" class="film-details__controls">
            ${controlsItemButton}
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
            <ul id="${id}" class="film-details__comments-list">
              ${createCommentsList(film)}
            </ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
                    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
                        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                          <label class="film-details__emoji-label" for="emoji-puke">
                            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
                            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                              <label class="film-details__emoji-label" for="emoji-angry">
                                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
        </div>
        </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupFilmView extends AbstractView {

  #cards = null;
  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {
    return createPopupFilmTemplate(this.#cards);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  setClosePopupClickHandler = (callback) => {
    this._callback.closePopup = callback;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #closePopupClickHandler = (e) => {
    e.preventDefault();
    this._callback.closePopup();
  }
}
