class CommandStack {
  constructor(emitter) {
    this.stack = [];
    this.finished = [];
    this.emitter = emitter;
  }

  addCommand(com) {
    this.pauseExecutions();

    com.setEmmiter(this.emitter);

    this.stack.push(com);
    if (this.stack.length) com.setPrevious(this.stack[this.stack.length - 1]);

    this.startLastExecution();
  }

  pauseExecutions() {
    for (const com of this.stack) {
      clearInterval(com.execution);
    }
  }

  startLastExecution() {
    if (this.stack.length) this.stack[this.stack.length - 1].execute();
  }
}

module.exports = CommandStack;
