import AbstractView from './abstract-view.js';

const createFilmsSectionTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsView extends AbstractView {
  get template() {
    return createFilmsSectionTemplate();
  }
}
