const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const SALT_LENGTH = 12;

router.post("/signup", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({'_id':new BSON.ObjectID(id)});
    if (userInDatabase) {
      return res.json({ error: "Username already taken." });
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
    });
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
