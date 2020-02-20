const uuid = require("uuid");
const EventEmitter = require("events");
const { EVENTS } = require("./src/constants");
const eventHandler = require("./src/eventHandler");

// create an emitter and then apply the checks
const emitter = new EventEmitter();
eventHandler(emitter);

class World {
  constructor(emitter) {
    this.emitter = emitter;
  }
}

class Card {}
class Game {}
class Player {}
