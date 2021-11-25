import { RenderPosition } from './consts.js';

export const renderTemplate = (container, template, place = RenderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};
