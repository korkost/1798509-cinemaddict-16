import dayjs from 'dayjs';
import { getRandomPositiveFloat } from './common.js';

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
