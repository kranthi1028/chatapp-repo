const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    email: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
    },
    mobile: {
      type: String,
    },
    socketid: {
      type: String,
    },
    connections: {
      type: Array,
    },
    status: {
      type: String,
      enum: [true,false]
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema);
exports.User = User;
