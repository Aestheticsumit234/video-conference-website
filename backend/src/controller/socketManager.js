import { Server } from "socket.io";

let connection = {};
let message = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
      cors:{
        origin:"*",
        methods:["GET","POST"],
        allowedHeaders:["*"],
        credentials: true
      }
  });
  io.on("connection", (socket) => {
    socket.on("join_room", (path) => {
      if (connection[path] === undefined) {
        connection[path] = [];
      }
      connection[path].push(socket.id);
      timeOnline[socket.id] = Date.now();

      for (let i = 0; i < connection[path].length; i++) {
        io.to(connection[path][i]).emit(
          "user-joined",
          socket.id,
          connection[path],
        );
      }

      if (message[path] === undefined) {
        for (let a = 0; a < message[path].length; a++) {
          io.on(socket.id).emit(
            "chat-message",
            message[path][a]["data"],
            message[path][a]["sender"],
            message[path][a]["socket-id-sender"],
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connection).reduce(
        ([room, isfound], [roomkey, roomvalue]) => {
          if (!isfound && roomvalue.includes(socket.id)) {
            return [roomkey, true];
          }
          return [room, isfound];
        },
        [null, false],
      );
      if (found === true) {
        if (message[matchingRoom] === undefined) {
          message[matchingRoom] = [];
        }
        message[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        connection[matchingRoom].forEach((id) => {
          io.to(id).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      let diffTime = Math.abs(timeOnline[socket.id] - Date.now());
      let key;
      for (const [k, value] of JSON.parse(
        JSON.stringify(Object.entries(connection)),
      )) {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === socket.id) {
            key = k;
            for (let j = 0; j < connection[key].length; j++) {
              io.to(connection[key][j]).emit(
                "user-left",
                socket.id,
                connection[key],
              );
            }

            let index = connection[key].indexOf(socket.id);

            connection[key].splice(index, 1);
            if (connection[key].length === 0) {
              delete connection[key];
            }
          }
        }
      }
      console.log("user disconnected");
    });
  });
  return io;
};

export default connectToSocket;
