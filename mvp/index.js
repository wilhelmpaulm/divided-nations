const uuid = require('uuid');
const EventEmitter = require('events');
const { EVENTS, CARD_TYPES } = require('./src/constants');
const eventHandler = require('./src/eventHandler');

// create an emitter and then apply the checks
const emitter = new EventEmitter();
eventHandler(emitter);

class World {
  constructor(emitter) {
    this.emitter = emitter;
  }
}

class Card {
  constructor() {
    this.uuid = uuid.v4();
    this.type = '';
  }

  play() {}
  apply() {}
  discard() {}
}

class BombCard extends Card {
  constructor() {
    this.super();
  }
}

class CardFactory {
  constructor({ type }) {
    switch (type) {
      case CARD_TYPES.BOMB:
        return new CardBomb();

      case CARD_TYPES.BOMB:
        return new CardBomb();

      default:
        break;
    }
    return card;
  }
}

class Game {
  constructor() {
    this.uuid = uuid.v4();
    this.deck = [];
    this.graveyard = [];
  }
}

class Player {
  constructor() {
    this.uuid = uuid.v4();
    this.deck = [];
  }
}
