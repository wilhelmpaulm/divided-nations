const EventEmitter = require('events');

class CommandEmitter {
  constructor(emitter = undefined) {
    this.emitter = emitter || new EventEmitter();
  }

  add(eventName, eventCallback) {
    this.emitter.on(eventName, eventCallback);
    return this;
  }

  remove()

  trigger(eventName, ...params) {
    this.emitter.emit(eventName, ...params);
    return this;
  }

  get() {
    return this.emitter;
  }
}

module.exports = CommandEmitter;

// const emitter = new EventEmitter();
// emitter.on('done', com => {
//   this.stack = this.stack.filter(x => x != com);
//   this.finished.push(com);
// });

// console.log(emitter);

x = new EventEmitter();
x
const commandEmitter = new CommandEmitter();
commandEmitter
  .addEvent('done', (a, b, c) => {
    console.log({ a, b, c });
  })
  .triggerEvent('done', 1, 'asdfasdfasdf');
