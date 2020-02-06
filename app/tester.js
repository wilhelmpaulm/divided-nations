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
  locked: true
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

console.log(defaultCard().play());
console.log(defaultCard());
console.log(defaultCard());
