class SocketHandler {
  constructor() {
    this.io = undefined;
  }

  setIo(io) {
    this.io = io;

    this.io.on("connection", () => {
      console.log("a user is connected");
    });
  }
}

module.exports = new SocketHandler();
