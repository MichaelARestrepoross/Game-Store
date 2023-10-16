const { nanoid } = require('nanoid');
const gamePrice = require('../data/gamePrice.json');
const print = console.log;
const { readJSONFile, writeJSONFile } = require('./helpers'); 

const cartFile = 'cart.json';

let cart = readJSONFile('./data', cartFile);

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

  function update(store, cart, qrID2, newGame, releasedInput, age_rating) {
    const isReleased = releasedInput === "true" ? true : false;
    const index = store.findIndex((game) => game.qrID === qrID2);
    const indexCart = cart.findIndex((game) => game.qrID === qrID2);
  
    if (index > -1) {
      store[index].qrID = qrID2;
      store[index].name = newGame;
      store[index].price_in_cents = gamePrice[newGame] || 6000;
      store[index].released = isReleased;
      store[index].age_rating = age_rating || "E";
    
  
      print(store[index]);
      print('Game successfully updated in the store');
  
      if (indexCart > -1) {
        cart[indexCart].qrID = qrID2;
        cart[indexCart].name = newGame;
        cart[indexCart].price_in_cents = gamePrice[newGame] || 6000;
        cart[indexCart].released = isReleased;
        cart[indexCart].age_rating = age_rating || "E"
        
  
        print(cart[indexCart]);
        print('Game successfully updated in the cart');
      }
  
      return [store, cart];
    } else {
      print('Game not found in the store. No action taken');
      return [store, cart];
    }
  }
  
  
  function searchByID(store, qrID2) {
    const game = store.find((game) => game.qrID === qrID2);
    return 'qrID:'+game.qrID + '  Name:' + game.name + '  Rating:'+ game.age_rating+ '  price: $' + game.price_in_cents/100 ;
  }

  function addToCart(store, gameName) {
    const game = store.find((game) => game.name === gameName);
    if (game) {
      cart.push(game);
      console.log(`Added ${game.name} to the cart.`);
    }else {
      console.log(`Game ${gameName} not found.`);
    }
    return cart; 
  }
  function removeFromCart(cart, gameName) {
    const gameIndex = cart.findIndex((game) => game.name === gameName);
    if (gameIndex !== -1) {
      cart.splice(gameIndex, 1);
      console.log(`Removed ${gameName} from the cart.`);
    } else {
      console.log(`Game ${gameName} not found in the cart.`);
    }
    return cart;
  }

  function calculateTotalPrice(cart){
    const totalPrice = cart.reduce((total, game) => total + game.price_in_cents, 0);
    return totalPrice / 100; 
  }
  
  function viewCart(cart){
    if (cart.length === 0) {
      console.log("Your cart is empty.");
    } else {
      console.log("Cart Contents:");
      cart.forEach((game) => {
      console.log(`Name: ${game.name}, Price: $${game.price_in_cents / 100}`);
      });
      console.log(`Total Price: $${calculateTotalPrice(cart)}`);
    }
  }




module.exports = {
    create,
    deleteGame,
    update,
    searchByID,
    addToCart,
    removeFromCart,
    viewCart
};