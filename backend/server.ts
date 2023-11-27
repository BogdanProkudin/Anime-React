import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as UserController from "./controller/UserController";
import NodeMediaServer from "node-media-server";
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
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://kodikapi.com/list?token=205cbb1f38375f91b405169fa2da91a8&types=anime-serial"
    );
    const parsedData = response.data; // Ваша логика парсинга
    console.log(parsedData);

    res.json(parsedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(3333, () => {
  try {
    return console.log("Server OK");
  } catch (err) {
    return console.log("Server bad");
  }
});
