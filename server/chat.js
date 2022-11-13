const socketIO = require("socket.io");

function chat(server) {
  var io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["secretHeader"],
      credentials: true,
    },
  });

  var peers = {};
  var sequenceNumberByClient = new Map();
  io.on("connection", (socket) => {
    console.log("Client connect!");

    peers[socket.id] = socket;
    sequenceNumberByClient.set(socket, 1);

    socket.on("join", function (data) {
      socket.join(data.account_id);
      socket.join(data.kindergarden);
      console.log(
        data.account_id + " is online for kindergarden " + data.kindergarden
      );
      socket.broadcast.to(data.kindergarden).emit("joined", {
        account_id: data.account_id,
        message: "New user joined to kindergarden!",
      });
    });

    socket.on("message", function (data) {
      // io.in(data.received_id).emit("received_message", {
        console.log(data);
      socket.broadcast.to(data.received_id).emit("received_message", {
        kindergarden: data.kindergarden,
        sender_id: data.sender_id,
        received_id: data.received_id,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      sequenceNumberByClient.delete(socket);
      console.info(`Client gone [id=${socket.id}]`);
    });
  });

  setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
      client.emit("seq-num", sequenceNumber);
      sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
  }, 1000);
}

module.exports = chat;
