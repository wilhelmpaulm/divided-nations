class SocketHandler {
  constructor() {
    this.io = undefined;
  }

  setIo(io) {
    this.io = io;
  }
}

module.exports = new SocketHandler();
