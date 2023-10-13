const { nanoid } = require('nanoid');
const gamePrice = require('../data/gamePrice.json');

function create(games, gameName,Released,age_rat) {
    const game = {
      name: gameName,
      // Limit the id to be 4 characters long by placing a 4 as the argument for nanoid
      id: nanoid(4),
      price_in_cents: gamePrice[gameName] || 6000, // if the game you create does not exist in the resource object of animals, it will be given a default points value of 10
      released:Released === "true"? true: false,
      age_rateing: age_rat || "E"
    };
    games.push(game);
    return games;
  }
module.exports = {
    create,
};