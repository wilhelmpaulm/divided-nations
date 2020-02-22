class Command {
  constructor () {
    this.execution = undefined;
  }
  execute () {
    this.execution = setTimeout(
      () => { console.log('command executed') },
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
    this.stack.push(com);
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

const commandStack = new CommandStack();
commandStack.add