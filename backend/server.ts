import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as UserController from "./controller/UserController";

import axios from "axios";
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://quard:Screaper228@cluster0.zyg0fil.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("BD Ok");
  })
  .catch((err) => {
    console.log("BD BAD", err);
  });

app.post("/Registration", UserController.Registration);
app.post("/LogIn", UserController.LogIn);
app.post("/ChangeUserName", UserController.updateNickname);
app.post("/ChangeEmail", UserController.updateEmail);
app.post("/ChangePassword", UserController.UpdatePassword);
app.post("/AddToWatch", UserController.AddAnimeToWatch);
app.listen(3003, () => {
  try {
    return console.log("Server OK");
  } catch (err) {
    return console.log("Server bad");
  }
});
