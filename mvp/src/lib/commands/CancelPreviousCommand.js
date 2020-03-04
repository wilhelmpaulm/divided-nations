const Command = requier('./Command');

class CancelPreviousCommand extends Command {
  constructor(num) {
    super(num);
  }

  execute() {
    this.execution = setTimeout(() => {
      this.emitter.emit('done', this.previous);
      if (this.previous.previous) this.previous = this.previous.previous;
      if (this.previous) this.previous.execute();
      this.emitter.emit('done', this);
    }, 1000);
  }
}

module.exports = CancelPreviousCommand;
