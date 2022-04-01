import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";
import authenticationsRoutes from "./routes/authentications.js";
import notesRoutes from "./routes/notes.js";

dotenv.config();
const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/dipay").then(() => {
  console.log("Mongodb connected");
});

app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.use("/authentications", authenticationsRoutes);
app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, () =>
  console.log(`SERVER RUNNING ON PORT: http://localhost:${PORT}`)
);
