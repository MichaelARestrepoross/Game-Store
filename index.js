const { readJSONFile, writeJSONFile } = require('./src/helpers');
const games = readJSONFile('./data', 'store.json');
const {create,deleteGame,update} = require("./src/storeController");
// create an alias called inform to store the console.log function
// When providing user feedback in the terminal use `inform`
// When developing/debugging use `console.log`
const print = console.log;

function run() {
  let writeToFile = false;
  let updatedStore = [];

  const action = process.argv[2];
  const gamesInput = process.argv[3];
  const realesedInput = process.argv[4];
  const age_rateing =process.argv[5];
  switch (action) {
    case 'showGames':
      print(action,games);
      break;
    case 'create':
    updatedStore = create(games, gamesInput,realesedInput,age_rateing);
    writeToFile = true;
    break;
    case 'show':
      print(action, gamesInput);
      break;
    case 'update':
        updatedStore = update(games, gamesInput,realesedInput,age_rateing);
        writeToFile = true;
        break;
    case 'deleteGame':
      updatedStore = deleteGame(games, gamesInput);
      writeToFile = true;
      break;
    case 'cart':
      print(action);
      break;
    default:
      print('There was an error.');
  }
  if (writeToFile) {
    writeJSONFile('./data', 'store.json', updatedStore);
  }
}

run();