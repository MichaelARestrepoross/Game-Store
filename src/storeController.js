const { nanoid } = require('nanoid');
const gamePrice = require('../data/gamePrice.json');
const print = console.log;
const { readJSONFile, writeJSONFile } = require('./helpers'); 

const cartFile = 'cart.json';

let cart = readJSONFile('./data', cartFile);
let customers = readJSONFile('./data','balance.json')

  function createGame(store, gameName,Released,age_rat) {
    const game = {
        name: gameName,
        // Limit the id to be 4 characters long by placing a 4 as the argument for nanoid
        qrID: nanoid(4),
        price_in_cents: gamePrice[gameName] || 6000, // if the game you create does not exist in the resource object of animals, it will be given a default value of 6000
        released:Released === "true"? true: false,
        age_rating: age_rat || "E"
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
  
      if(indexCart > -1) {
            cart[indexCart].qrID = qrID2;
            cart[indexCart].name = newGame;
            cart[indexCart].price_in_cents = gamePrice[newGame] || 6000;
            cart[indexCart].released = isReleased;
            cart[indexCart].age_rating = age_rating || "E"
        
            print(cart[indexCart]);
            print('Game successfully updated in the cart');
      }
  
    return [store, cart];
    }else {
        print('Game not found in the store. No action taken');
        return [store, cart];
    }
  }
  
  function searchById(store, qrID2) {
    const game = store.find((game) => game.qrID === qrID2);
    return 'qrID:'+game.qrID + '  Name:' + game.name + '  Rating:'+ game.age_rating+ '  price: $' + game.price_in_cents/100 ;
  }

  function viewStore(store){

    }

  function addToCart(store, gameName) {
    const game = store.find((game) => game.name === gameName);
    if(game) {
        cart.push(game);
        print(`Added ${game.name} to the cart.`);
    }else {
        print(`Game ${gameName} not found.`);
    }
    return cart; 
  }

  function removeFromCart(cart, gameName) {
    const gameIndex = cart.findIndex((game) => game.name === gameName);
    if(gameIndex !== -1) {
        cart.splice(gameIndex, 1);
        print(`Removed ${gameName} from the cart.`);
    }else {
        print(`Game ${gameName} not found in the cart.`);
    }
    return cart;
  }

  function calculateTotalPrice(cart){
    const totalPrice = cart.reduce((total, game) => total + game.price_in_cents, 0);
    return totalPrice / 100; 
  }
  
  function viewCart(cart){
    if(cart.length === 0) {
        print("Your cart is empty.");
    }else {
        print("Cart Contents:");
    cart.forEach((game) => {
        print(`Name: ${game.name}, Price: $${game.price_in_cents / 100}`);
    });
        print(`Total Price: $${calculateTotalPrice(cart)}`);
    }
  }

  function addCustomer(customers,name,balance, member){
    const customer = {
        name: name,
        // Limit the id to be 4 characters long by placing a 4 as the argument for nanoid
        id: nanoid(4),
        balanceInCents: parseInt(balance) || 0, 
        member:member === "true"? true: false,
      };
      customers.push(customer);
      return customers;
  }

  function removeCustomer(customers, id) {
    const index = customers.findIndex((customer) => customer.id === id);
    if(index !== -1) {
        customers.splice(index, 1); // Remove the customer object from the array
    }else {
        print("Customer not found.");
    }
    return customers;
  }

  function showCustomers(customers) {
    for(const customer of customers) {
        print(`Name: ${customer.name}`);
        print(`ID: ${customer.id}`);
        print(`Balance: $${(customer.balanceInCents/100).toFixed(2)}`);
        print(`Member: ${customer.member ? 'Yes' : 'No'}`);
        print('-----------------------');
    }
  }

  function addBalance(customers, customerId, amountToAdd) {
    const customerToUpdate = customers.find((customer) => customer.id === customerId);
    if(customerToUpdate) {
      customerToUpdate.balanceInCents += parseInt(amountToAdd);
    }
    return customers;
  }
  
  function checkout(cart, customers, customerId) {
    const customerIndex = customers.findIndex((customer) => customer.id === customerId);

    if(customerIndex !== -1) {
        const customer = customers[customerIndex];
        let updatedBalances = [...customers]; // create a copy of customers
        let updatedCustomer = { ...customer };
        let updatedCart = [...cart]; // Create a copy of the cart 
        let finalPrice = 0; 
        let checkoutSuccessful = false; 

        const totalPrice = calculateTotalPrice(cart);
        // Print customer's name and ID
        print(`Customer: ${customer.name} (ID: ${customer.id})`);
        viewCart(cart);
        print('\n');

        print(`Balance before checkout: $${(customer.balanceInCents / 100).toFixed(2)}`);
        print(`Total Price: $${totalPrice.toFixed(2)}`);

        if (customer.member) {
            print("Customer has a membership and receives a 10% discount.");
            const discount = totalPrice * 0.10;
            finalPrice = totalPrice - discount; // Update to a discountedPrice
            print(`Discounted Price: $${finalPrice.toFixed(2)}`);
        }else{
            finalPrice = totalPrice; // set it to original price
        }
        
        if (customer.balanceInCents >= Math.round(finalPrice * 100)) {
            // Customer has enough balance, process the checkout
            customer.balanceInCents -= Math.round(finalPrice * 100);
            print(`Checkout successful. Remaining balance: $${(customer.balanceInCents / 100).toFixed(2)}`);
            updatedCustomer = customer;
            checkoutSuccessful = true; // Update checkoutSuccessful flag
            updatedBalances[customerIndex] = updatedCustomer;
            updatedCart =[];
        }else {
            print("Insufficient balance to complete the checkout.");
            checkoutSuccessful = false; // Set checkoutSuccessful to false
        }

        print("checkoutSuccessful: " + checkoutSuccessful); // Add this line to print the value of checkoutSuccessful

        return { updatedBalances, updatedCart, checkoutSuccessful };
    }else {
        print("Customer not found.");
        return { updatedBalances, updatedCart: cart, checkoutSuccessful: false };
    }
}

  
  
module.exports = {
    createGame,
    deleteGame,
    update,
    searchById,
    viewStore,
    addToCart,
    removeFromCart,
    viewCart,
    addCustomer,
    showCustomers,
    removeCustomer,
    addBalance,
    checkout
};