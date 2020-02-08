const uuid = require("uuid");

const defaultCard = {
  id: uuid.v4(),
  name: undefined,
  details: undefined,
  icon,
  blockable,
  play: function () {
    // override this function
    console.log(`card ${this.id} has been played`);
  }
};

const createCard = ({ name }) => {

  return { ...card, name, details }
}

const createCard = ({ name, details = undefined, icon = undefined, blockable = false }) => ({
  id: uuid.v4(),
  name: name || undefined,
  details,
  icon,
  blockable,
  play: function () {
    // override this function
    console.log(`card ${this.id} has been played`);
  }
});

const createPlayer = ({ deck, hand, graveyard }) => ({
  id: uuid.v4(),
  deck: [],
  hand: [],
  graveyard: [],
  target: [],
  locked: true,
  dead: false
});

const createGame = ({ hostPlayerId, players, deck, graveyard }) => ({
  self: this,
  id: uuid.v4(),
  hostPlayerId,
  players: players || [],
  deck: deck || [],
  graveyard: graveyard || [],
  turns: [],
  locked: false,
  addPlayer: () => {
    console.log(this.)
  }
});

const createTurn = ({ playerId, message, cardId }) => ({
  playerId,
  message: message || undefined,
  cardId: cardId || undefined,
  action: action || undefined,
});

// we're using maps to make it easier to fetch details
// create lobby to host games
const games = {};
// create players list
const players = {};
// accounts of 3 players are created
const player1 = createPlayer({});
const player2 = createPlayer({});
const player3 = createPlayer({});

const game = createGame({ hostPlayerId: player1.id });
game.addPlayer();


// player creates a new game