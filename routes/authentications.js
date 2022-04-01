import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { loginValidation } from "../validation.js";
const router = express.Router();

//login
router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if username exist
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) return res.status(400).send("Username and password is wrong.");

  if (req.body.password != user.password)
    res.status(400).send("Username and password is wrong.");

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const tokenUpdate = { token: token };
  let updateToken = await User.findOneAndUpdate(
    { userName: req.body.userName },
    tokenUpdate,
    { new: true }
  );
  // res.header("auth-token,token").send(token);
  res.header("auth-token", token).send(token);
});

router.delete("/", async (req, res) => {
  let updateToken = await User.findOneAndUpdate(
    { token: req.body.token },
    { token: null },
    { new: true }
  );
  res.send("Logout success.");
});
export default router;
