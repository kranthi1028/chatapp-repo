const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const cors = require("cors");
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
const io = require("socket.io")(http, {
  cors: {
    origins: ["https://chatapp-c.vercel.app/"],
  },
});
const mongoose = require("mongoose");
const user = require("./src/routes/user");
const { User } = require("./src/models/user");
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
//database connection
mongoose
  .connect(
    "mongodb+srv://newuser:newuser@socialmedia.emihq.mongodb.net/notes_app?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("db not connected", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});
//socket
io.on("connection", (socket, next) => {
  //set the username and uniqID
  let users = [];
  const username = socket.handshake.auth.name;
  const uniqID = socket.handshake.auth.uniqID;
  console.log(username);
  console.log(uniqID);
  console.log(socket.join(uniqID));
  //joining with uniqID
  socket.join(uniqID);
  socket.username = username;
  socket.uniqID = uniqID;

  statusUpdate(socket);
  console.log("user connected : ", {
    rooms: socket.rooms,
    username: socket.username,
    id: socket.id,
    uniqID: socket.uniqID,
  });
  //action to list current users
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: socket.handshake.auth.uniqID,
      username: socket.username,
      messages: [],
      status: false,
    });
  }

  //action to add the new user when connnected
  socket.broadcast.emit("user connected", {
    userID: socket.handshake.auth.uniqID,
    username: socket.username,
    messages: [],
    status: true,
  });
  socket.emit("users", users);
  //action on disconnect
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    const updateOper = await User.findByIdAndUpdate(
      { _id: socket.uniqID },
      { status: false }
    );

    if (updateOper) {
      console.log("UPDATED THE STATUS OF USER to false", updateOper);
    } else {
      console.log("not updated the status of user");
    }
  });
  //action on private message
  socket.on("private message", ({ data, to }) => {
    socket.to(to).to(socket.uniqID).emit("private message", {
      data,
      from: uniqID,
    });
  });
  //action on new message
  socket.on("new-message", (data) => {
    console.log("server", data);
    try {
      socket.broadcast.emit("message-broadcast", data);
    } catch (error) {
      console.log("error");
    }
  });
});

statusUpdate = async (socket) => {
  const updateOper = await User.findByIdAndUpdate(
    { _id: socket.uniqID },
    { status: true }
  );

  if (updateOper) {
    console.log("UPDATED THE STATUS OF USER to true");
  } else {
    console.log("not updated the status of user");
  }
};

async function getUsersData() {
  let users = await User.find().then((data) => {
    console.log("users", data);
    return data;
  });
}

//http requests
app.use("/api/user", user);

http.listen(3000, () => {
  console.log("listening on *:3000");
});
