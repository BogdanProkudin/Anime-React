import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as UserController from "./controller/UserController";
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

app.listen(3333, () => {
  try {
    return console.log("Server OK");
  } catch (err) {
    return console.log("Server bad");
  }
});
