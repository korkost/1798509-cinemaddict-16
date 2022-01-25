import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

const AMOUNT_OF_TIME = {
  DAY: 7,
  MONTH: 1,
  YEAR: 1,
};

const StepsOfRank = {
  NOVICE: {
    MIN: 1,
    MAX: 10,
  },
  FAN: {
    MIN: 11,
    MAX: 20,
  },
};

const TitleRank = {
  NONE: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

dayjs.extend(isBetween);

export const currentDate = new Date();
export const weekDate = dayjs().subtract(AMOUNT_OF_TIME.DAY, 'day').toDate();
export const monthDate = dayjs().subtract(AMOUNT_OF_TIME.MONTH, 'month').toDate();
export const yearDate = dayjs().subtract(AMOUNT_OF_TIME.YEAR, 'year').toDate();

export const filmsToFilterMap = {
  'all-time': (films) => films.filter((film) => film['user_details']['already_watched']),
  today: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isSame(currentDate, 'day')),
  week: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(weekDate, currentDate, 'day', '[]')),
  month: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(monthDate, currentDate, 'month', '[]')),
  year: (films) => films.filter((film) => film['user_details']['already_watched'] && dayjs(film['user_details']['watching_date']).isBetween(yearDate, currentDate, 'year', '[]')),
};

export const getTotalDuration = (films) => {
  if (films.length === 0) {
    return '';
  }

  return films
    .map(({ film_info: { runtime } }) => runtime)
    .reduce((a, b) => a + b, 0);
};

export const getGenres = (films) => {
  const genresForStatistics = {};

  films
    .reduce((array, film) => array.concat(film['film_info']['genre']), [])
    .forEach((genre) => {
      if (genresForStatistics[genre]) {
        genresForStatistics[genre]++;
        return;
      }
      genresForStatistics[genre] = 1;
    });

  return genresForStatistics;
};

export const getTopGenre = (films) => {
  if (films.length === 0) {
    return '';
  }

  const genresForStatistics = getGenres(films);
  const [topGenreStatistics] = Object.entries(genresForStatistics).sort((a, b) => b[1] - a[1]);

  return topGenreStatistics[0];
};

export const getUserRank = (films) => {
  const totalWatch = films.reduce((count, film) => count + Number(film['user_details']['already_watched']), 0);

  if (totalWatch >= StepsOfRank.NOVICE.MIN && totalWatch <= StepsOfRank.NOVICE.MAX) {
    return TitleRank.NOVICE;
  } else if (totalWatch >= StepsOfRank.FAN.MIN && totalWatch <= StepsOfRank.FAN.MAX) {
    return TitleRank.FAN;
  } else if (totalWatch > StepsOfRank.FAN.MAX) {
    return TitleRank.MOVIE_BUFF;
  }

  return TitleRank.NONE;
};
