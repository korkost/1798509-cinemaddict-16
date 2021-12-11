import { datePopup, createElement } from '../utils/helpers.js';
import { createlsItemButton } from './film-card-view.js';

const createPopupFilmTemplate = ({
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
  controlsItemButton,
  comment,
  commentImg,
  commentName,
}) => {

  const commentsList = (
    `<li li class="film-details__comment" >
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${commentImg}" width="55" height="55" alt="emoji-smile">
      </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${commentName}</span>
            <span class="film-details__comment-day">2019/12/31 23:59</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
    </li>`
  );

  return (
    `<section class="film-details" >
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
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
          <section class="film-details__controls">
            ${createlsItemButton(controlsItemButton)}
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
            <ul class="film-details__comments-list">
              ${commentsList}
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

export default class PopupFilmView {
  #element = null;
  #cards = null;
  constructor(cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPopupFilmTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
