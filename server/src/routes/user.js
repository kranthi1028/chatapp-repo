const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
// const auth = require("../middleware/auth");

router.post("/adduser", controller.add_user);
router.post("/login", controller.login);
router.get("/getusers", controller.getUsers);
module.exports = router;