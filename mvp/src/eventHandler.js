const { EVENTS } = require("./constants");
module.exports = eventEmitter => {
  eventEmitter.on(EVENTS.ON_GAME_CREATE, () => {});
  eventEmitter.on(EVENTS.ON_GAME_START, () => {});
  eventEmitter.on(EVENTS.ON_GAME_END, () => {});
  eventEmitter.on(EVENTS.ON_PLAYER_CREATE, () => {});
  eventEmitter.on(EVENTS.ON_PLAYER_JOIN, () => {});
  eventEmitter.on(EVENTS.ON_PLAYER_QUIT, () => {});
  eventEmitter.on(EVENTS.ON_PLAYER_WIN, () => {});
  eventEmitter.on(EVENTS.ON_PLAYER_LOSS, () => {});
  eventEmitter.on(EVENTS.ON_CARD_DRAW, () => {});
  eventEmitter.on(EVENTS.ON_CARD_PLAY, () => {});
  eventEmitter.on(EVENTS.ON_CARD_DISCARD, () => {});
};
