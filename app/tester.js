const uuid = require("uuid");
const EventEmitter = require("events");

const cardNames = {
  DRAW: "DRAW",
  BOMB: "BOMB",
  DIFFUSE: "DIFFUSE",
  SKIP: "SKIP",
  ATTACK: "ATTACK",
  PEEK: "PEEK",
  BLOCK: "BLOCK",
  FALSE: "FALSE",
  TAKE: "TAKE"
};

const eventNames = {
  ON_CARD_ADD: "ON_CARD_ADD",
  ON_CARD_PLAY: "ON_CARD_PLAY",
  ON_CARD_DISCARD: "ON_CARD_DISCARD",
  ON_PLAYER_ADD: "ON_PLAYER_ADD",
  ON_PLAYER_DEATH: "ON_PLAYER_DEATH"
};

const baseCard = {
  id: undefined,
  owner: undefined,
  name: undefined,
  details: undefined,
  icon: undefined,
  blockable: false,
  transfer() {
    // override this
    // action to be performed on play
    console.log(`${this.id} is being transferred`);
  },
  play(options = {}) {
    // override this
    // action to be performed on play
    emitter.emit(this.name, options);
    console.log(`${this.id} is being played`);
  }
};

const basePlayer = {
  id: undefined,
  game: undefined,
  locked: true,
  dead: false
};

const baseGame = {
  id: undefined,
  hostPlayerId: undefined,
  addPlayer(player) {
    const { deck, graveyard } = this;
    player.game = { deck, graveyard };
    this.players.push(player);
  },
  initDeck() {
    for (let count = 0; count <= 30; count++) {
      this.deck.push(createCardByName(cardNames.FALSE));
    }
  },
  addBombs() {
    for (let count = 0; count < this.players.length - 1; count++) {
      addCard(this.deck, cardNames.BOMB);
    }
  },
  distributeCards() {
    for (const player of this.players) {
      for (let count = 0; count < 7; count++) {
        transferCard(this.deck, player.deck);
      }
    }
  },
  distributeDiffuseCards() {
    for (const player of this.players) {
      addCard(player.deck, cardNames.DIFFUSE);
    }
    for (let count = 0; count < this.players.length - 1; count++) {
      addCard(this.deck, cardNames.DIFFUSE);
    }
  },
  startGame() {
    // initialize deck
    this.initDeck();
    // shuffle players to make it fair for every one
    shuffleStack(this.players);
    // give players cards
    this.distributeCards();
    // give players 1 diffuse card
    this.distributeDiffuseCards();
    // add bombs to the deck
    this.addBombs();
    // shuffle the game deck to make it fair
    shuffleStack(this.deck);
    // unlock the first player
    addCard(this.players[0].deck, cardNames.DRAW);
    // TODO: add event emitter on ad card for player
  }
};

const shuffleStack = stack => stack.sort(() => 0.5 - Math.random());

const addCard = (toStack, name) => {
  const card = createCardByName(name);
  toStack.push(card);

  return card;
};

const removeCard = (fromStack, card) => {
  fromStack.splice(fromStack.indexOf(card), 1);
  return card;
};

const transferCard = (
  fromStack,
  toStack,
  optional = {
    name: undefined,
    index: undefined
  }
) => {
  let card;

  if (optional.name) {
    card = fromStack.find(card => card.name === optional.name);
    fromStack.splice(fromStack.indexOf(card), 1);
  } else if (optional.index && fromStack[optional.index] !== undefined) {
    card = fromStack[optional.index];
    fromStack.splice(optional.index, 1);
  } else {
    card = fromStack.pop();
  }

  if (card) toStack.push(card);
  return card;
};

const createCard = (properties = {}) => {
  properties.id = uuid.v4();
  return { ...baseCard, ...properties };
};

const createCardByName = name => {
  const properties = getCardDetails(name);
  return createCard(properties);
};

const getCardDetails = name => {
  const properties = { name };

  switch (name) {
    case cardNames.DRAW:
      properties.play = function() {
        console.log("this", this);
      };
      break;
    case cardNames.BOMB:
      properties.play = function() {
        console.log("this", this);
      };
      break;
    case cardNames.FALSE:
      properties.play = function() {
        console.log("this", this);
      };
      break;
    default:
      break;
  }
  return properties;
};

const createPlayer = (properties = {}) => {
  properties.id = uuid.v4();
  properties.hand = [];
  properties.deck = [];
  properties.graveyard = [];
  properties.target = {
    cards: [],
    players: []
  };
  properties.play = function(index) {
    console.log(this.deck[index]);
    this.deck[index].play(this.target);
  };
  return { ...basePlayer, ...properties };
};

const createGame = (properties = {}, emitter = undefined) => {
  properties.id = uuid.v4();
  properties.players = [];
  properties.deck = [];
  properties.graveyard = [];
  properties.turns = [];
  return { ...baseGame, ...properties };
};

// we're using maps to make it easier to fetch details
// create lobby to host games
const worldGames = [];
// create players list
const worldPlayers = [];
// accounts of 3 players are created
const player1 = createPlayer({ name: "a" });
const player2 = createPlayer({ name: "b" });
const player3 = createPlayer({ name: "c" });

const game = createGame({ hostPlayerId: player1.id });
// add players to the created game
game.addPlayer(player1);
game.addPlayer(player2);
game.addPlayer(player3);
game.startGame();
// player1.play(7);
console.log("player.locked", player1.locked);
console.log("player.locked", player2.locked);
console.log("player.locked", player3.locked);
