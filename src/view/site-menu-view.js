import AbstractView from './abstract-view.js';

const createSiteMenuItemTemplate = (filter) => {
  const { name, count } = filter;
  return (
    `<a href="#${name}" class="main-navigation__item">${name.substring(0, 1).toUpperCase() + name.substring(1)} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createSiteMenuTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter) => createSiteMenuItemTemplate(filter))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          ${filterItemsTemplate}
      </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenuView extends AbstractView {
  #filters = null;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {

    return createSiteMenuTemplate(this.#filters);
  }
}
