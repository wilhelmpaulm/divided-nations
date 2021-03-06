module.exports = {
  EVENTS: {
    ON_GAME_CREATE: 'ON_GAME_CREATE',
    ON_GAME_START: 'ON_GAME_START',
    ON_GAME_END: 'ON_GAME_END',
    ON_PLAYER_CREATE: 'ON_PLAYER_CREATE',
    ON_PLAYER_JOIN: 'ON_PLAYER_JOIN',
    ON_PLAYER_WIN: 'ON_PLAYER_WIN',
    ON_PLAYER_LOSS: 'ON_PLAYER_LOSS',
    ON_PLAYER_QUIT: 'ON_PLAYER_QUIT',
    ON_CARD_DRAW: 'ON_CARD_DRAW',
    ON_CARD_PLAY: 'ON_CARD_PLAY',
    ON_CARD_DISCARD: 'ON_CARD_DISCARD'
  },
  CARD_TYPES: {
    DRAW: 'DRAW',
    BOMB: 'BOMB',
    PEEK: 'PEEK',
    SKIP: 'SKIP',
    ATTACK: 'ATTACK',
    SHUFFLE: 'SHUFFLE',
    TRASH: 'TRASH',
    FAVOR: 'FAVOR',
    STOP: 'STOP'
  },
  COMMAND_STATUS: {
    CREATED: 'created',
    ADDED: 'added',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    STARTED: 'started',
    DONE: 'done',
    ERROR: 'error'
  },
  COMMAND_TIMEOUT: 1000
};
