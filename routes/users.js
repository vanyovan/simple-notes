import express from "express";
import User from "../models/User.js";
import { registerValidation } from "../validation.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user in database
  const userNameExist = await User.findOne({ userName: req.body.userName });
  if (userNameExist)
    return res
      .status(400)
      .send("Username already exist. Choose other username");

  const user = new User({
    userName: req.body.userName,
    password: req.body.password,
    fullName: req.body.fullName,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send("error");
  }
});

export default router;
