import { FilterType } from './consts.js';

export const filter = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.user_details.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.user_details.already_watched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.user_details.favorite),
};
