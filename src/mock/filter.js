const filmCardFilter = {
  Watched: (cards) => cards
    .filter((card) => card.isWatched).length,
  Favorites: (cards) => cards
    .filter((card) => card.isFavorite).length,
  Watch: (cards) => cards
    .filter((card) => card.isWatchlist).length,
};

//const array = [Watched, Favorites, Watch];
//const total = array.reduce(function (acc, elem) {
 // return
//})

export const generateFilter = (cards) => Object.entries(filmCardFilter).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards),
  }),
);
