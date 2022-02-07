export const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export const Selectors = {
  FILM_LIST: '.films-list',
  MAIN: '.main',
  HEADER: '.header',
  FOOTER: '.footer',
  FOOTER_STATISTICS: '.footer__statistics',
  STATISTICS_CHART: '.statistic__chart',
  MAIN_NAVIGATION: '.main-navigation',
  MAIN_NAVIGATION_ITEM: '.main-navigation__item--active',
  MAIN_NAVIGATION_ADDITIONAL:'.main-navigation__additional',
  FILM_CONTAINER: '.films-list__container',
  FILM_CARD_LINK: '.film-card__link',
  FILM_CARD_WATCHLIST: '.film-card__controls-item--add-to-watchlist',
  FILM_CARD_WATCHED: '.film-card__controls-item--mark-as-watched',
  FILM_CARD_FAVORITE: '.film-card__controls-item--favorite',
  FILM_DETAILS: '.film-details',
  FILM_DETAILS_CLOSE: '.film-details__close-btn',
  FILM_DETAILS_EMOJI: '.film-details__emoji-list',
  FILM_DETAILS_ADD_EMOJI: '.film-details__add-emoji-label',
  FILM_DETAILS_COMMENT: '.film-details__comment-input',
  FILM_DETAILS_WATCHLIST: '.film-details__control-button--watchlist',
  FILM_DETAILS_WATCHED: '.film-details__control-button--watched',
  FILM_DETAILS_FAVORITE: '.film-details__control-button--favorite',
  SHOW_MORE: '.films-list__show-more',
};

export const NUMBER_MINUTES_PER_HOUR = 59;

export const DESCRIPTION_LENGTH = 140;

export const FILM_COUNT = {
  PER_STEP: 5,
  EXTRA: 2,
};

export const TIME_PERIOD = {
  SECONDS: {
    MAX: 60,
  },
  MINUTES: {
    MIN: 1,
    MAX: 60,
  },
  HOURS: {
    MIN: 1,
    MAX: 24,
  },
  DAYS: {
    MIN: 1,
    MAX: 30,
  },
  MONTHS: {
    MIN: 1,
    MAX: 12,
  },
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const FILM_BLOCKS = {
  main: {
    title: 'All movies. Upcoming',
    isTitleHidden: true,
  },
  topRated: {
    title: 'Top rated',
    isExtra: true,
  },
  mostCommented: {
    title: 'Most commented',
    isExtra: true,
  },
  empty: {
    title: 'There are no movies in our database',
    isEmpty: true,
  },
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  DELETE: 'DELETE',
  ADD: 'ADD',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
  STATS: 'Stats',
};


export const StatisticsType = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const State = {
  ADDING: 'ADDING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

