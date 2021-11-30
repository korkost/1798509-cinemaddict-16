import { getRandomInteger, getRating, generateDate, generateDuration } from '../utils/helpers.js';

const generateTitle = () => {
  const titles = [
    'Made for each other',
    'popeye meets sunbad',
    'sagebrush trail',
    'santa claus conquers the martians',
    'the dance of life',
    'the greate flamarion',
    'the man wiyh the golden arm',
  ];
  return titles[getRandomInteger(0, titles.length - 1)];
};
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Nunc fermentum tortor ac porta dapibus.',
  ];
  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};
const generateImg = () => {
  const images = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];
  return images[getRandomInteger(0, images.length - 1)];
};
const generateGenre = () => {
  const genre = [
    'Western',
    'Drama',
    'Mystery',
    'Comedy',
    'Adventure',
    'Music',
    'Crime',
  ];
  return genre[getRandomInteger(0, genre.length - 1)];
};
const generateCountry = () => {
  const countries = [
    'United States',
    'Brazil',
    'Russia',
    'China',
    'Italy',
    'Germany',
  ];
  return countries[getRandomInteger(0, countries.length - 1)];
};
const generateDirector = () => {
  const directors = [
    'Quentin Tarantino',
    'Guillermo del Toro',
    'George Miller',
    'Lana Wachowski',
  ];
  return directors[getRandomInteger(0, directors.length - 1)];
};
const generateActor = () => {
  const actors = [
    'Keanu Reeves',
    'Norman Reedus',
    'Mel Gibson',
  ];
  return actors[getRandomInteger(0, actors.length - 1)];
};
const generateWriter = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
  ];
  return writers[getRandomInteger(0, writers.length - 1)];
};
const generateColorRating = () => {
  const colorRating = [
    'good',
    'average',
    'poor',
  ];
  return colorRating[getRandomInteger(0, colorRating.length - 1)];
};

const generateComment = () => {
  const comments = [
    'Very very old. Meh',
    'Almost two hours? Seriously?',
    'Interesting setting and a good cast'
  ];
  return comments[getRandomInteger(0, comments.length - 1)];
};
const generateCommentImg = () => {
  const commentsImg = [
    'smile.png',
    'puke.png',
    'sleeping.png',
    'angry.png'
  ];
  return commentsImg[getRandomInteger(0, commentsImg.length - 1)];
};
const generateCommentName = () => {
  const commentsName = [
    'Tim Macoveev',
    'John Do',
    'John Mason',
  ];
  return commentsName[getRandomInteger(0, commentsName.length - 1)];
};
const generateOriginalTitle = () => {
  const originalTitle = [
    'The Great Flamarion',
    'Made for Each Other',
    'Santa Claus Conquers the Martians',
  ];
  return originalTitle[getRandomInteger(0, originalTitle.length - 1)];
};
const generateAgeRating = () => {
  const ageRating = [
    '18+',
    '16+',
    '21+',
  ];
  return ageRating[getRandomInteger(0, ageRating.length - 1)];
};

export const generateCard = () => ({
  releaseDate: generateDate(),
  title: generateTitle(),
  description: generateDescription(),
  img: generateImg(),
  genre: generateGenre(),
  country: generateCountry(),
  rating: Number(getRating()),
  actors: generateActor(),
  director: generateDirector(),
  writers: generateWriter(),
  colorRating: generateColorRating(),
  duration: generateDuration(),
  countComment: getRandomInteger(0, 99),
  comment: generateComment(),
  commentImg: generateCommentImg(),
  commentName: generateCommentName(),
  commentCount: getRandomInteger(0, 99),
  originalTitle: generateOriginalTitle(),
  ageRating: generateAgeRating(),
  isWatchlist: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
