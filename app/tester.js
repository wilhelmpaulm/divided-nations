const uuid = require("uuid");

const defaultCard = () => ({
  id: uuid.v4(),
  name: "",
  details: "",
  icon: "",
  blockable: false,
  play: function() {
    // override this function
    console.log(`card ${this.id} has been played`);
  }
});

const defaultPlayer = () => ({
  id: uuid.v4(),
  deck: [],
  hand: [],
  graveyard: [],
  target: [],
  locked: true,
  dead: true
});

const defaultGame = () => ({
  id: uuid.v4(),
  players: [],
  deck: [],
  hand: [],
  graveyard: [],
  turns: [],
  locked: false
});

const defaultAction = () => ({
  cardId: undefined,
  fromPlayerId: undefined,
  toPlayerId: undefined,
  fromStackId: undefined,
  toStackId: undefined
});

console.log(defaultCard().play());
console.log(defaultCard());
console.log(defaultCard());
