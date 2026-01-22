import { Server } from "socket.io";

const rooms = {}; // { roomId: [socketIds] }
const chatHistory = {}; // { roomId: [ { sender, data, socketId } ] }
const timeOnline = {}; // { socketId: timestamp }

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (roomId, username) => {
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push(socket.id);
      timeOnline[socket.id] = Date.now();

      socket.join(roomId);

      socket.to(roomId).emit("user-joined", {
        userId: socket.id,
        username,
        participants: rooms[roomId],
      });

      if (chatHistory[roomId]) {
        chatHistory[roomId].forEach((msg) => {
          socket.emit("chat-message", {
            data: msg.data,
            sender: msg.sender,
            socketId: msg.socketId,
          });
        });
      }

      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("signal", (toId, signalData) => {
      if (!toId) return;
      io.to(toId).emit("signal", {
        from: socket.id,
        signal: signalData,
      });
    });

    socket.on("chat-message", (data, sender) => {
      const roomId = findUserRoom(socket.id);

      if (!roomId) return;

      if (!chatHistory[roomId]) {
        chatHistory[roomId] = [];
      }

      const messageObj = {
        sender,
        data,
        socketId: socket.id,
      };

      chatHistory[roomId].push(messageObj);

      io.to(roomId).emit("chat-message", messageObj);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      const roomId = findUserRoom(socket.id);
      if (!roomId) return;

      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);

      socket.to(roomId).emit("user-left", {
        userId: socket.id,
        participants: rooms[roomId],
      });

      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
        delete chatHistory[roomId];
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};

function findUserRoom(socketId) {
  for (const roomId in rooms) {
    if (rooms[roomId].includes(socketId)) {
      return roomId;
    }
  }
  return null;
}

export default connectToSocket;
