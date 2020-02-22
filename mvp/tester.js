const EventEmitter = require('events')
const emitter = new EventEmitter();

class Command {
  constructor () {
    this.execution = undefined;
    this.previous = undefined;
  }

  setPrevious (command) {
    this.previous = command;
  }

  execute () {
    this.execution = setTimeout(
      () => {
        console.log('command executed');
        if (this.previous) this.previous.execute();
      },
      5000
    );
  }

  cancel () {
    if (this.execution) clearInterval(this.execution);
  }
}

class CommandStack {
  constructor () {
    this.stack = [];
  }

  addCommand (com) {
    this.pauseExecutions();
    if (this.stack.length) com.setPrevious(this.stack[this.stack.length - 1]);
    this.stack.push(com);
    this.startLastExecution();
  }

  pauseExecutions () {
    for (const com of this.stack) {
      clearInterval(com.execution);
    }
  }

  startLastExecution () {
    if (this.stack.length) this.stack[this.stack.length - 1].execute();
  }
}

emitter.on('ADD_CARD', (data) => {
  data.commandStack.pauseExecutions();
  data.commandStack.startLastExecution();
});


const commandStack = new CommandStack();
commandStack.addCommand(new Command());
commandStack.addCommand(new Command());
commandStack.addCommand(new Command());
console.log(commandStack.stack.length)