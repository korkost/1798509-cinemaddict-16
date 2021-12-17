import { getRandomInteger } from '../utils/common';

const getRandomRating = () => {
  const ratings = [
    'novice',
    'fan',
    'Movie Buff',
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);
  return ratings[randomIndex];
};

const getRandomAvatar = () => {
  const avatars = [
    './images/bitmap@2x.png'
  ];

  return avatars[0];
};

const generateProfile = () => ({
  rating: getRandomRating(),
  avatar: getRandomAvatar()
});

export { generateProfile };
