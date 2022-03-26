//let {io} = require("./index");
// const io = require("socket.io")(8080, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

const runSocketServer = (io) => {
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  const removeUser = (socketId) => {
    // console.log("before remove users>>> ", users);
    users = users.filter((user) => user.socketId !== socketId);
    //console.log("after remove user >>> ", users);
  };
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  const getUserBySocketId = (socketId) => {
    return users.find((user) => user.socketId === socketId);
  };

  io.on("connection", (socket) => {
    //when connect
    console.log("a user connected to a socket server!");
    // after wvery connection take userId and SocketId from user
    socket.on("addUser", (userId) => {
      console.log("addig User ", userId, socket.id);
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
    // console.log("socket users>>> ", users);
    //send and recieve message

    socket.on(
      "sendMessage",
      ({ senderId, receiverId, text, imgUrl, isReceived }) => {
        const user = getUser(receiverId);
        //console.log("sendig message to >> ", user);
        io.to(user?.socketId).emit("getMessage", {
          senderId,
          text,
          imgUrl,
          isReceived,
        });
      }
    );

    //send and recieve conversations
    socket.on(
      "sendConversation",
      ({ conversationId, senderId, receiverId }) => {
        const user = getUser(receiverId);
        //console.log("receiverId>> ", receiverId);
        //console.log("sending conversation to ", user?.userId);
        //console.log("conversationId > ", conversationId);
        //console.log("senderId>> ", senderId);
        io.to(user?.socketId).emit("getConversation", {
          conversationId,
          senderId,
          receiverId,
        });
      }
    );
    //video call
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
      // console.log("call ended");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      const fromUser = getUserBySocketId(from);
      const user = getUser(userToCall);
      console.log("calling ", userToCall, user?.socketId);
      io.to(user?.socketId).emit("callUser", {
        signal: signalData,
        from: fromUser?.userId,
        name,
      });
      // console.log("vall user");
    });

    socket.on("answerCall", (data) => {
      const user = getUser(data.to);
      io.to(user?.socketId).emit("callAccepted", data.signal);
      //console.log("answer call");
    });
    socket.on("endCall", ({ receiverId }) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("endCall", true);
      //console.log("ending call with ", receiverId);
    });
    // socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //   io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    //   console.log("vall user");
    // });

    // socket.on("answerCall", (data) => {
    //   console.log("/*******************************************/");
    //   console.log("data>>>> ", data);
    //   console.log("socket id real>> ", data.to);
    //   console.log("users>>> ", users);

    //   console.log("/*******************************************/");
    //   io.to(data.to).emit("callAccepted", data.signal);
    //   console.log("answer call");
    // });

    //send and recieve notifications
    // socket.on("sendNotification", ({ receiverId, text, read }) => {
    //   const user = getUser(receiverId);
    //   //console.log("receiverId>> ", receiverId);
    //   //console.log("sending conversation to ", user?.userId);
    //   //console.log("conversationId > ", conversationId);
    //   //console.log("senderId>> ", senderId);
    //   io.to(user?.socketId).emit("getNotification", {
    //     receiverId,
    //     text,
    //     read,
    //   });
    // });

    //when disconnect
    socket.on("disconnect", () => {
      //console.log("a user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

module.exports = runSocketServer;
