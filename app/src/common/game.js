const uuid = require("uuid");

const events = {
  ADD_PLAYER: "ADD_PLAYER",
  INIT_DECK: "INIT_DECK",
  INIT_DECK: "INIT_DECK"
};

const baseGame = {
  id: uuid.v4(),
  players: [],
  deck: [],
  graveyard: [],
  turns: [],
  hostPlayerId: undefined,
  addPlayer(player) {
    const { deck, graveyard } = this;
    player.game = { deck, graveyard };
    this.players.push(player);
  },
  initDeck() {
    for (let count = 0; count <= 30; count++) {
      this.deck.push("asdf");
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
  }
};

function createGame(properties = {}, emitter = undefined) {
  //   properties.emitter = emitter || new EventEmitter();
  return Object.create(baseGame);
  //   return { ...baseGame, ...properties };
}

module.exports = {
  createGame,
  events
};
