import express from "express";
import User from "../models/User.js";
import Notes from "../models/Notes.js";
import verify from "./verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const notesList = await Notes.find({});
  res.send(notesList);
});

router.get("/:id", async (req, res) => {
  const notesList = await Notes.findOne({ id: req.params.id });
  try {
    if (!notesList) res.send("Notes not found");
    res.send(notesList);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", verify, async (req, res) => {
  const userLogin = await User.findOne({ _id: req.user._id });
  res.send(userLogin);
});

router.put("/", verify, async (req, res) => {
  const userLogin = await User.findOne({ _id: req.user._id });
  const notesList = await Notes.findOne().sort({
    _id: "-1",
  });
  const id = !notesList ? 1 : parseInt(notesList.id) + 1;

  const notes = new Notes({
    id: id,
    title: req.body.title,
    description: req.body.description,
    creator: userLogin.userName,
  });
  try {
    const savedNotes = await notes.save();
    res.send(savedNotes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", verify, async (req, res) => {
  const userLogin = await User.findOne({ _id: req.user._id });
  const notesList = await Notes.findOne({ id: req.params.id });
  try {
    if (!notesList) res.status(400).send("Notes not found.");
    if (notesList.creator == userLogin.userName) {
      const deletedNotes = await notesList.delete();
      res.send(deletedNotes);
    } else {
      res.send("Not authorized to delete.");
    }
  } catch (err) {
    // res.status(400).send(err);
  }
});
export default router;
