const express = require("express");

const ejs = require("ejs");

const http = require("http");

const path = require("path");

const socketIO = require("socket.io");
const { Socket } = require("dgram");

const mongoose = require("mongoose");

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "public"));

app.engine("html", ejs.renderFile);

app.use("/", (req, res) => {
  res.render("index.html");
});

function conectDB() {
  let dbUrl =
    "mongodb+srv://mrliedson:Txr6r4jbxGROC2zO@bd3-nosql-atlasmongodb.zj0vnrl.mongodb.net/";

  mongoose.connect(dbUrl);

  mongoose.connection.on(
    "error",
    console.error.bind(console, "conection error: ")
  );

  mongoose.connection.once("open", function callBack() {
    console.log("Conectou!!!");
  });
}

let messages = [];

conectDB();

let Message = mongoose.model("Message", {
  usuario: String,
  data_hora: String,
  mensagem: String,
});

Message.find({})
  .then((docs) => {
    console.log("DOCS:" + docs);
    messages = docs;
    console.log("MESSAGES:" + messages);
  })
  .catch((error) => {
    console.log("ERRO:" + error);
  });

io.on("connection", (socket) => {
  console.log("ID de usuário " + socket.id);

  socket.emit("previousMessage", messages);

  socket.on("sendMessage", (data) => {
    //messages.push(data);

    let message = new Message(data);

    //socket.broadcast.emit('receivedMessage', data);

    message
      .save()
      .then(socket.broadcast.emit("receivedMessage", data))
      .catch((error) => {
        console.log("ERRO:" + error);
      });
  });
});

server.listen(3000, () => {
  console.log("SER RODAR EU SOU MUITO BOM - http://localhost:3000");
});
