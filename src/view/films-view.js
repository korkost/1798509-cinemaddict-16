import AbstractView from './abstract-view.js';

const createFilmSectionTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsView extends AbstractView {
  get template() {
    return createFilmSectionTemplate();
  }
}
