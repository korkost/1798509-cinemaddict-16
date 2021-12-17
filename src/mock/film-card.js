import { nanoid } from 'nanoid';
import {
  getRandomInteger,
  generateDate,
  generateDuration
} from '../utils/common.js';
import { getRating } from '../utils/task.js';
import {
  TITLES,
  DESCRIPTION,
  IMAGES,
  GENRE,
  WRITERS,
  COUNTRIES,
  DIRECTORS,
  ACTORS,
  COLOR_RATING,
  COMMENTS,
  COMMENTS_IMG,
  COMMENTS_NAME,
  ORIGINAL_TITLE,
  AGE_RATING,
  MIN_COMMENT,
  MAX_COMMENT
} from './constants.js';

export const generateCard = () => ({
  id: nanoid(),
  releaseDate: generateDate(),
  title: TITLES[getRandomInteger(0, TITLES.length - 1)],
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  img: IMAGES[getRandomInteger(0, IMAGES.length - 1)],
  genre: GENRE[getRandomInteger(0, GENRE.length - 1)],
  country: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)],
  rating: Number(getRating()),
  actors: ACTORS[getRandomInteger(0, ACTORS.length - 1)],
  director: DIRECTORS[getRandomInteger(0, DIRECTORS.length - 1)],
  writers: WRITERS[getRandomInteger(0, WRITERS.length - 1)],
  colorRating: COLOR_RATING[getRandomInteger(0, COLOR_RATING.length - 1)],
  duration: generateDuration(),
  countComment: getRandomInteger(MIN_COMMENT, MAX_COMMENT),
  comment: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  commentImg: COMMENTS_IMG[getRandomInteger(0, COMMENTS_IMG.length - 1)],
  commentName: COMMENTS_NAME[getRandomInteger(0, COMMENTS_NAME.length - 1)],
  commentCount: getRandomInteger(MIN_COMMENT, MAX_COMMENT),
  originalTitle: ORIGINAL_TITLE[getRandomInteger(0, ORIGINAL_TITLE.length - 1)],
  ageRating: AGE_RATING[getRandomInteger(0, AGE_RATING.length - 1)],
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
