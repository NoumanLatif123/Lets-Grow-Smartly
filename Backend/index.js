const connectToMongo = require("./db");
const express = require("express");
//const server = require("http").createServer(express);
const runSocketServer = require("./socket");
var cors = require("cors");
const bodyParser = require("body-parser");

connectToMongo();

const app = express();
const server = require("http").Server(app);
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for form post requests
app.use(express.static(`${__dirname}/public`));
//this may cause error express.static
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

runSocketServer(io);

// Avaliable routes
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/conversations", require("./routes/conversations"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/user"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/video", require("./routes/video"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/comments", require("./routes/comments"));

// io.on("connection", (socket) => {
//   console.log("user connected with socket server");
//   io.emit("welcome", "Welcome to socket server");
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callended");
//   });

//   socket.on("calluser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("calluser", { signal: signalData, from, name });
//   });

//   socket.on("answercall", (data) => {
//     io.to(data.to).emit("callaccepted", data.signal);
//   });
// });

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
