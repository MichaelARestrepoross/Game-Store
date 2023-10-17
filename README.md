# Game-Store-Project

## Description:
It is a digital simulation of a game store where users will be able to create, delete, or update games, saving them in the store. The system also contains a library of over 100 games with preset prices, although they are not necessary. If a user wants to add a game that is not on the list of set prices, it will still work with a default price.

Using the Game Store Project, users will also be able to simulate purchasing a game by adding games to a cart, which is saved until the purchase is complete. They can check out using a customer account that will be saved for future use.

The Game Store Project may also create, delete, or show these users with a randomized 4-characterID , name, their current balance, and whether they have a membership, which gives them a 10% discount.

## Instructions:
-----------------
1. fork and clone the repository 
2. Make sure you have some version of node installed by useing node -v
3. In your terminal type and enter :node -v

An example output : v20.5.1

4. If you have not installed node make sure to instaall it
5. Now in your terminal: npm install nanoid@3
6. This a necasary package.
7. You should be ready to use the Game-Store-Project now. best of luck 😎

## Script directions call:
--------------------------
use: npm run functionNamegoeshere : data
example: npm run createGame "last of us 2" true T

In this example you are calling the function adding a name, if it is realesed or not as true and T for the rating of the game. it will pull the price from a lybrary of 100 games or set it as defualt of $60.00 dollars.


### Store functions list:
---------------------------
1. createGame (gameName,Released,age_rating): Creates a game in the store with a user inputed Name, a random id 4 long, true or fasle for realesed and A age rating. 

        To use: npm run createGame "game Name here" true M


2. deleteGame (id): Searches through the store to remove the game from the store/ shelves. Will not remove games a customer already put in the cart.
ABCD is example id for a game to delete below.

        To use: npm run deleteGame ABCD 


3. update (id , newGame, releasedInput, age_rating): takes a id finds the game and updates it. With a diffrent Game name, true or false if it realesed and if the user wantes, a new age rating

        To use: npm run update ABCD "NewGameName" true T


4. searchByID (id): Takes an id of a game in the store and prints out its information such as its id, name, rating and price

        To use: npm run searchById ABCD


5. viewStore(): Shows all the games and the infomration in them such as their name, QR ID, the price, if they are realesed and the age rating

        To use: npm run viewStore


### Cart function list:
-----------------------
1. addToCart (gameName): Takes a game name searches the store for the game and adds it to your cart.

        To run: npm run addToCart


2. removeFromCart (gameName): Takes a game name from your cart and removes it.

        To use: npm run removeFromCart "gameName" 


3. viewCart(): Takes all the games in your cart and shows you them with their prices and the total cost of your cart

        To use: npm run showCart


4. checkout(customers id): Takes a customer ID and buys all the items in the cart if you have the balance to do so.

        To use: npm run checkout ABCD

### Customer functions:
------------------------

1. addCustomer(name,balance, member) : creates a customer with a name, a randomized 4 character ID , current balance and if they have a membership that gives them a 10 percent discount.

        To use: npm run checkout ABCD


2. removeCustomer(customers, id)

        To use: npm run removeCustomer ABCD


3. showCustomers(): Shows all users name, id, current balance and if they are a member or not

        To use: npm run showCustomers


4. addBalance(CustomerId, amount of cash): Adds cash in cents to a specific customer useing their id and the cash amount in cents after.

        To use : npm run addBalance ABCD 5000

    to add $50.00 dollars to the id ABCD

