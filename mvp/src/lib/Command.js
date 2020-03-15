const uuid = require('uuid');
const constants = require('./../constants');
const { COMMAND_TIMEOUT } = constants;
const {
  CANCELLED,
  COMMAND_ADDED,
  DONE,
  ERROR,
  STARTED,
  PAUSED
} = constants.COMMAND_STATUS;

class Command {
  constructor(data) {
    const { action, emitter, params, previous } = data;
    this.id = uuid.v4();
    this.status = COMMAND_ADDED;

    this.promise = new Promise();
    this.action = action;
    this.params = params;
    this.emitter = emitter;
    this.previous = previous;
  }

  setPrevious(command) {
    this.previous = command;
  }

  setEmmiter(emitter) {
    this.emitter = emitter;
  }

  execute() {
    this.execution = setTimeout(() => {
      this.start();
      this.done();
      if (this.previous) this.previous.execute();
    }, COMMAND_TIMEOUT);
  }

  start() {
    if (this.action) {
      try {
        this.status = STARTED;
        this.action(this.params);
      } catch (error) {
        this.status = ERROR;
      }
      this.log();
    }
  }

  cancel() {
    this.status = CANCELLED;
    this.emitter.emit(CANCELLED, this);
    this.log();
  }

  done() {
    this.status = DONE;
    this.emitter.emit(DONE, this);
    this.log();
  }

  pause() {
    this.status = PAUSED;
    if (this.execution) clearInterval(this.execution);
    this.log();
  }

  log() {
    console.log(`command: ${this.id} is ${this.status}`);
  }
}

module.exports = Command;
