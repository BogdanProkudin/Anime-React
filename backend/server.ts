import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as UserController from "./controller/UserController";
import NodeMediaServer from "node-media-server";

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
// ДРУГОЕ
// const config = {
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 60,
//     ping_timeout: 30,
//   },
//   http: {
//     port: 8000,
//     allow_origin: "*",
//     mediaroot: "./media",
//     webroot: "./www",
//     stream_route: "/live/",
//     websocket: {
//       port: 8000,
//     },
//   },
// };

// const nms = new NodeMediaServer(config);
// nms.run();
app.listen(3333, () => {
  try {
    return console.log("Server OK");
  } catch (err) {
    return console.log("Server bad");
  }
});
