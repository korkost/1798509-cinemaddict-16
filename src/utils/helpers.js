import dayjs from 'dayjs';
import { RenderPosition } from './consts.js';

export const renderTemplate = (container, template, place = RenderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
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
  const maxDaysGap = 36000;
  const daysGap = getRandomInteger(1, maxDaysGap);
  return dayjs().add(-daysGap, 'day').toDate();
};

export const generateDuration = () => {
  const hours = getRandomInteger();
  const minutes = getRandomInteger(1, 59);
  let durations = hours ? `${hours}h ` : '';
  durations += `${minutes}m`;
  return durations;
};

export const getRating = () => getRandomPositiveFloat(1, 10, 1);

export const date = (dueDate) => dayjs(dueDate).format('YYYY');

export const datePopup = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
