import { FAN, NOVICE } from '../utils/consts.js';
import { createElement } from '../utils/helpers.js';

const createRatingTemplate = (count) => {
  const getRank = () => {
    if (count <= NOVICE) {
      return 'Novice';
    } else if (count <= FAN) {
      return 'Fan';
    } else {
      return 'Movie buff';
    }
  };

  return `<p class="profile__rating">${getRank(count)}</p>`;
};

const createProfileTemplate = (count) => {
  const rating = count > 0 ? createRatingTemplate(count) : '';

  return (
    `<section class="header__profile profile">
      ${rating}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileView {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get template() {
    return createProfileTemplate(this.#count);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
