const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  User  = require("../models/User");

const SALT_LENGTH = 12;

router.post("/signup", async (req, res) => {
  try {
    console.log("line 10 in signup post function");
    const { username, email, password, firstName, lastName, address } =
      req.body;
    const userInDatabase = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userInDatabase) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);
    console.log("user not already created. creating user...");
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
      address,
    });

    console.log("user created. sending token...");
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
