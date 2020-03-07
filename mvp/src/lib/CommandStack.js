const uuid = require('uuid');
const EventEmitter = require('events');
const { DONE, ERROR, CANCELLED } = require('./../constants').COMMAND_STATUS;

const emitterSetup = (commandStack) => {
  commandStack.emitter.on(DONE, (command) => {
    commandStack.clean();
  });
  commandStack.emitter.on(CANCELLED, (command) => {
    commandStack.remove(command.id);
    commandStack.clean();
  });
};

class CommandStack {
  constructor() {
    this.id = uuid.v4();
    this.stack = [];
    this.finished = [];
    this.emitter = new EventEmitter();
    emitterSetup(this);
  }

  /**
   * pause all executions then add a new command and restart the executions
   * @param command Command
   */
  add(command) {
    this.pause();

    // set the last command as this command's previous attribute
    if (this.stack.length) {
      command.setPrevious(this.stack[this.stack.length - 1]);
    }

    command.setEmmiter(this.emitter);
    this.stack.push(command);
    this.start();
  }

  /**
   * stops all executions
   */
  pause() {
    for (const command of this.stack) {
      command.pause();
    }
  }

  /**
   * stops all executions
   */
  clean() {
    this.finished = this.stack.filter((command) =>
      [DONE, ERROR, CANCELLED].includes(command.status)
    );

    this.stack = this.stack.filter(
      (command) => ![DONE, ERROR, CANCELLED].includes(command.status)
    );
  }

  /**
   * removes an execution
   */
  remove(id) {
    this.stack = this.stack.filter((command) => command.id !== id);
  }

  /**
   * execute the last item
   */
  start() {
    if (this.stack.length) this.stack[this.stack.length - 1].execute();
  }
}

module.exports = CommandStack;
