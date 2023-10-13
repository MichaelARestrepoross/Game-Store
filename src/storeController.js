const { nanoid } = require('nanoid');
const gamePrice = require('../data/gamePrice.json');
const print = console.log;

function create(store, gameName,Released,age_rat) {
    const game = {
      name: gameName,
      // Limit the id to be 4 characters long by placing a 4 as the argument for nanoid
      qrID: nanoid(4),
      price_in_cents: gamePrice[gameName] || 6000, // if the game you create does not exist in the resource object of animals, it will be given a default points value of 10
      released:Released === "true"? true: false,
      age_rateing: age_rat || "E"
    };
    store.push(game);
    return store;
  }
  function deleteGame(store, qrID2) {
    const index = store.findIndex((game) => game.qrID === qrID2.trim());
    if (index > -1) {
      store.splice(index, 1);
      print('game successfully removed from collection');
      return store;
    } else {
        print('game not found. No action taken');
      return store;
    }
  }
  function update(store, qrID2, newGame,realesedInput, age_rat) {
    const index = store.findIndex((game) => game.qrID === qrID2);
    if (index > -1) {
        store[index].qrID = qrID2;
        store[index].name = newGame;
        store[index].price_in_cents = gamePrice[newGame] || 6000;
        if(realesedInput){
            store[index].released = true;
        }else{
            store[index].released = false;
        }
        store[index].age_rating = age_rat || store[index].age_rating
        print(store[index]);
        print('game successfully updated');
      return store;
    } else {
      print('game not found. No action taken');
      return store;
    }
  }

function searchByID(store, qrID2) {
    const game = store.find((game) => game.qrID === qrID2);
    return 'qrID:'+game.qrID + '  Name:' + game.name + '  Rating:'+ game.age_rating+ '  price: $' + game.price_in_cents/100 ;
  }


module.exports = {
    create,
    deleteGame,
    update,
    searchByID
};