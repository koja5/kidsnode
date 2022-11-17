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

  io.on("connection", (socket) => {
    peers[socket.id] = socket;
    socket.on("join", function (data) {
      socket.join(data.account_id);
      socket.join(data.kindergarden);
      socket.broadcast.to(data.kindergarden).emit("joined", {
        account_id: data.account_id,
        message: "New user joined to kindergarden!",
      });
    });

    socket.on("message", function (data) {
      console.log(data);
      socket.broadcast.to(data.received_id).emit("received_message", {
        kindergarden: data.kindergarden,
        sender_id: data.sender_id,
        received_id: data.received_id,
        message: data.message,
      });
      socket.broadcast.to(data.received_id).emit("new_message_notification", {
        sender_id: data.sender_id,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      socket.disconnect();
    });
  });
}

module.exports = chat;
