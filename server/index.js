const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/users", (req, res) => {
  res.status(200).send({ message: "user saved successfully" });
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
