const Command = require('../src/lib/Command');
const Cancel = require('../src/lib/commands/Cancel');
const CommandStack = require('../src/lib/CommandStack');

const commandStack = new CommandStack();

// console.log(commandStack);
// console.log(command);

setTimeout(() => {
  commandStack.add(
    new Command({
      action: console.log,
      params: 'A'
    })
  );
});

setTimeout(() => {
  commandStack.add(
    new Command({
      action: console.log,
      params: 'B'
    })
  );
});

setTimeout(() => {
  commandStack.add(
    new Cancel({
      action: console.log,
      params: 'C'
    })
  );
});
