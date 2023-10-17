const { readJSONFile, writeJSONFile } = require('./src/helpers');
const games = readJSONFile('./data', 'store.json');
const cartFile = readJSONFile('./data','cart.json');
const customers = readJSONFile('./data', 'balance.json');

const {create,deleteGame,update, searchById,addToCart,removeFromCart,viewCart,addCustomer,removeCustomer,addBalance, checkout} = require("./src/storeController");
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const print = console.log;

function run() {
  let writeToFile = false;
  let writeToCart = false;
  let writeToBalance =false;
  let updatedStore = [];
  let updatedCart =[];
  let updatedBalance =[];

  const action = process.argv[2];
  const gamesInput = process.argv[3];
  const realesedInput = process.argv[4];
  const age_rating =process.argv[5];
  switch (action) {
    case 'showGames':
        print(action,games);
        break;
    case 'create':
        updatedStore = create(games, gamesInput,realesedInput,age_rating);
        writeToFile = true;
        break;
    case 'searchById':
        const searchgame = searchById(games, gamesInput); // gamesInput is the id 
        print(searchgame);
        break;
    case 'update':
        const [, , cmd ,id,name,realesed, rating] = process.argv;
        [updatedStore, updatedCart] = update(games, cartFile, id, name, realesed,rating);
        writeToFile = true;
        writeToCart = true;
        break;
    case 'deleteGame':
        updatedStore = deleteGame(games, gamesInput);
        writeToFile = true;
        break;
    case 'addToCart':
        updatedCart = addToCart(games,gamesInput)
        writeToCart = true;
        break;
    case 'removeFromCart':
        updatedCart = removeFromCart(cartFile,gamesInput);
        writeToCart = true;
        break;
    case 'showCart':
        viewCart(cartFile)
        break; 
    case 'addCustomer':
        print(process.argv);
        updatedBalance = addCustomer(customers,gamesInput,realesedInput,age_rating); // action, name ,balance , membership
        writeToBalance = true;
        break;
    case 'removeCustomer':
        updatedBalance = removeCustomer(customers, gamesInput); // balance.json file , customerID
        writeToBalance = true;
        break;
    case 'addBalance':
        updatedBalance = addBalance(customers,gamesInput,realesedInput);// balance.json file, customerID, amount of $
        writeToBalance = true;
        break;
    case 'checkout':
        const { updatedBalances, updatedCart, checkoutSuccessful } = checkout(cartFile, customers, gamesInput);// ID
        if (checkoutSuccessful) {
            updatedBalance =updatedBalances;
            writeToBalance = true // Update the customer's balance
            writeToCart =true; // Only update the cart if checkout was successful

        } else {
        console.log("Checkout was not successful.");
        }
        break;
    default:
        print('There was an error.');
  }
  if (writeToFile) {
    writeJSONFile('./data', 'store.json', updatedStore);
  }
  if (writeToCart) {
    writeJSONFile('./data', 'cart.json', updatedCart);
  }
  if(writeToBalance){
    writeJSONFile('./data', 'balance.json',updatedBalance);
  }
}

run();
      //showCart()  
      /* maybe use while loop to add to array that has accumulator useing proccess.argsv[accumulator]
       to continue add games to the cart and show final price at the end where they will ether type
        buy or cancel to exit*/