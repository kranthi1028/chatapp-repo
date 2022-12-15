const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
const mongoose = require("mongoose");

//database connection
mongoose
  .connect(
    "mongodb+srv://newuser:newuser@socialmedia.emihq.mongodb.net/chat_app?retryWrites=true&w=majority",
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
//http requests

http.listen(3000, () => {
  console.log("listening on *:3000");
});
