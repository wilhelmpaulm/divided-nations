class Command {
  constructor(props) {
    const {emitter,}
    this.execution = undefined;
    this.emitter = undefined;
    this.previous = undefined;
    this.num = num;
  }

  setPrevious(command) {
    this.previous = command;
  }

  setEmmiter(emitter) {
    this.emitter = emitter;
  }

  execute() {
    this.execution = setTimeout(() => {
      if (this.previous) this.previous.execute();
      this.emitter.emit('done', this);
    }, 1000);
  }

  cancel() {
    if (this.execution) clearInterval(this.execution);
  }
}

module.exports = Command;
