import dayjs from 'dayjs';
import { getRandomPositiveFloat } from './common.js';
import {
  Date,
  MIN_VALUE,
  MAX_RATING
} from './consts.js';


export const getRating = () => getRandomPositiveFloat(MIN_VALUE, MAX_RATING);

export const date = (dueDate) => dayjs(dueDate).format(Date.YEAR);

export const datePopup = (dueDate) => dayjs(dueDate).format(Date.DATE_MONTH_YEAR);
