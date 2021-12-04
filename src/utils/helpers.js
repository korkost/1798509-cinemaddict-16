import dayjs from 'dayjs';
import { RenderPosition, Date, MAX_DAYS_GAP, MIN_VALUE, MAX_MINUTES, MAX_RATING } from './consts.js';

export const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch(position) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

export const generateDate = () => {
  const daysGap = getRandomInteger(MIN_VALUE, MAX_DAYS_GAP);

  return dayjs().add(-daysGap, 'day').toDate();
};

export const generateDuration = () => {
  const hours = getRandomInteger();
  const minutes = getRandomInteger(MIN_VALUE, MAX_MINUTES);

  let durations = hours ? `${hours}h ` : '';

  durations += `${minutes}m`;

  return durations;
};

export const getRating = () => getRandomPositiveFloat(MIN_VALUE, MAX_RATING);

export const date = (dueDate) => dayjs(dueDate).format(Date.YEAR);

export const datePopup = (dueDate) => dayjs(dueDate).format(Date.DATE_MONTH_YEAR);
