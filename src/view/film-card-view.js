import { date } from '../utils/helpers.js';

export const createFilmCardTemplate = (card) => {
  const {
    title,
    description,
    img,
    genre,
    rating,
    colorRating,
    isWatchlist,
    isWatched,
    isFavorite,
    releaseDate,
    duration,
    countComment,
  } = card;

  const watchlistClassName = isWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';
  const watchedClassName = isWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';
  const favoritesClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  const controlsItemButton = `
  <button class="film-card__controls-item ${watchlistClassName}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item ${watchedClassName}" type="button">Mark as watched</button>
  <button class="film-card__controls-item ${favoritesClassName}" type="button">Mark as favorite</button>`;

  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating film-card__rating--${colorRating}">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date(releaseDate)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${img}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${description}tr…</p>
        <span class="film-card__comments">${countComment} comments</span>
      </a>
      <div class="film-card__controls">
        ${controlsItemButton}
      </div>
    </article>`;
};
