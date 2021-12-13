import AbstractView from './abstract-view.js';

const createShowMoreTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreView extends AbstractView {

  get template() {

    return createShowMoreTemplate();

  }
}
