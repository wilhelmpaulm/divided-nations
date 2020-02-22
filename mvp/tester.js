const EventEmitter = require('events')
const emitter = new EventEmitter();

class Command {
  constructor (num) {
    this.execution = undefined;
    this.emitter = undefined;
    this.previous = undefined;
    this.num = num;
  }

  setPrevious (command) {
    this.previous = command;
  }

  setEmmiter (emitter) {
    this.emitter = emitter;
  }

  execute () {
    this.execution = setTimeout(
      () => {
        console.log(`Command executed ${this.num}`);
        if (this.previous) this.previous.execute();
        this.emitter.emit('done', this);
      },
      1000
    );
  }

  cancel () {
    if (this.execution) clearInterval(this.execution);
  }
}


class CommandCancel extends Command {
  constructor (num) {
    super(num);
  }

  execute () {
    this.execution = setTimeout(
      () => {
        console.log(`CommandCancel executed ${this.num}`);
        this.emitter.emit('done', this.previous);
        if (this.previous.previous) this.previous = this.previous.previous;
        if (this.previous) this.previous.execute();
        this.emitter.emit('done', this);
      },
      1000
    );
  }

}

class CommandStack {
  constructor (emitter) {
    this.stack = [];
    this.finished = [];
    this.emitter = emitter;
    this.emitter.on('done', (com) => {
      this.stack = this.stack.filter(x => x != com);
      this.finished.push(com);
      console.log('number of finished commands: ' + commandStack.finished.length)
    });
  }



  addCommand (com) {
    this.pauseExecutions();
    com.setEmmiter(this.emitter);
    if (this.stack.length) com.setPrevious(this.stack[this.stack.length - 1]);
    this.stack.push(com);
    console.log('total commands :', this.stack.length)
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


const commandStack = new CommandStack(emitter);
commandStack.addCommand(new Command('first'));
commandStack.addCommand(new Command('second'));
commandStack.addCommand(new Command('third'));
commandStack.addCommand(new Command('fourth'));
commandStack.addCommand(new Command('fifth'));
commandStack.addCommand(new CommandCancel('sixth'));
commandStack.addCommand(new CommandCancel('seventh'));
commandStack.addCommand(new CommandCancel('eight'));
commandStack.addCommand(new CommandCancel('ninth'));
commandStack.addCommand(new CommandCancel('tenth'));
commandStack.addCommand(new CommandCancel('eleventh'));