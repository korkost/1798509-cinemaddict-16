import AbstractView from '../view/abstract-view.js';
import FormatTime from './format-time.js';
import { NUMBER_MINUTES_PER_HOUR } from './consts.js';

export const changeWord = (array, word) => array.length === 1 ? word : `${word}s`;

export const addClassBySubmit = (submit, className) => submit ? className : '';

export const adjustElement = (container) => container instanceof AbstractView ? container.element : container;

export const sortDate = (filmA, filmB) => FormatTime.getDate(filmB.film_info.release.date, 'YYYY') - FormatTime.getDate(filmA.film_info.release.date, 'YYYY');

export const sortRating = (filmA, filmB) => filmB.film_info.total_rating - filmA.film_info.total_rating;

export const sortComments = (filmA, filmB) => filmB.comments.length - filmA.comments.length;

export const onEscKeyDown = (evt, cb) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    cb(evt);
  }
};

export const getHourFromMin = (mins) => ({
  hours: Math.trunc(mins / NUMBER_MINUTES_PER_HOUR),
  mins: mins % NUMBER_MINUTES_PER_HOUR,
});

