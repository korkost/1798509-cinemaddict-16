import dayjs from 'dayjs';
import {
  MAX_DAYS_GAP,
  MAX_MINUTES,
  MIN_VALUE
} from './consts.js';

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
