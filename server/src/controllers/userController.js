const { User } = require("../models/user");
const _ = require("lodash");

exports.add_user = async (req, res) => {
  try {
    //console.log(User);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("user already registered");
    user = new User(
      _.pick(req.body, ["username", "email", "password", "socketid"])
    );
    console.log("data", user);
    await user.save();
    return res.status(200).send({ message: "user saved successfully" });
  } catch (ex) {
    console.log("error/exception", ex);
    return res.status(500).error("internal server error");
  }
};

exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(200)
        .send({ message: "user logged successfully", data: user });
    }
    return res
      .status(400)
      .send({ message: "user not logged successfully", data: {} });
  } catch (ex) {
    console.log("error/exception", ex);
    return res.status(500).error("internal server error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).send({ data: users });
  } catch (ex) {
    console.log("error/exception", ex);
    return res.status(500).error("internal server error");
  }
};
