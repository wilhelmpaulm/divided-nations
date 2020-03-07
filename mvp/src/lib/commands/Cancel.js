const Command = require('./../Command');
const { COMMAND_TIMEOUT } = require('./../../constants');

class Cancel extends Command {
  constructor(num) {
    super(num);
  }

  execute() {
    this.execution = setTimeout(() => {
      this.start();
      const newPrevious =
        this.previous && this.previous.previous
          ? this.previous.previous
          : undefined;

      if (this.previous) {
        this.previous.cancel();
        this.previous = newPrevious;
      }
      this.done();
      if (this.previous) this.previous.execute();
    }, COMMAND_TIMEOUT);
  }
}

module.exports = Cancel;
