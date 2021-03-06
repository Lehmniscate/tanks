# Tanks
## Background
Tanks is a turn based game where a player faces off against other players or computer players. They are allowed to move a certain distance and aim and make a shot each turn. Terrain is destroyed with the shots as well as damage to the player if the player gets hit. Destroyed terrain under a tank will cause the tank to fall. Changes in terrain also provide varying obstacles for movement and aiming.

## Functionality and MVP

- [x] Start and reset the game board
- [x] Control tanks: rotate cannons and move tanks
- [x] Shoot cannons and register damage

In addition, this project will include:

- [x] An about modal describing the rules of the game
- [x] A production Readme

## Wireframes
This app consists of a single canvas element with the game level tanks and controls. The level is a two dimensional crossection of ground with tanks resting on top of it.

![wireframes](Tanks.png)

## Architecture and Technologies
This project will be implemented with the following technologies:
- Vanilla Javscript for the game logic and rendering to html canvas
- webpack to bundle and serve the various scripts

In addition to the webpack entry file, there will be the following scripts involved in the project:

`world.js`: handle the logic for rendering and holding the level data and tank pieces

`tank.js`: handle the logic for the tank pieces and their interactions

`level.js`: handle the logic for the terrain and its destruction

## Implementation Timeline

### Day 1
Set up node modules and get webpack set up. Set up the basic level generation and render to screen

- Get a green bundle with `webpack`
- Learn enough to render a simple level

### Day 2
Complete the `tank.js` logic and have a tank that can move, aim, and fire in the level.

- Complete the `tank.js` module
- Render a tank in the level
- Bind movement and control keys to movement and control of the tank in the level
- Render the movement and control of the tanks

### Day 3
Complete the `level.js` logic so that worlds can be generated and destroyed.

- Complete the `level.js` module
- Implement destruction logic into the level
- Ensure correct movement of tanks on top of the level
- Ensure tanks fall appropriately and climb appropriately

### Day 4
Complete the game logic in `world.js` to handle turns and destruction of tanks and starting/restarting of the game

- Implement Game-level controls
- Add multiple players and implement turns and game-end

## Bonus features
Some anticipated features to implement:

- Move the logic into three dimensions and implement `three.js`
- Add different weapons to be used by the tanks with varying effects and drawbacks
