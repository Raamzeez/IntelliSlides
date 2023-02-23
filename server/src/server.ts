import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import router from "./router";
import mongoose from "mongoose";

const PORT = 4000;
const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "1mb" }));

app.use("/api", router);

const connectionParams: mongoose.ConnectOptions = {};

mongoose.connect(
  "mongodb+srv://raamizabbasi:WdoauCvmccpX2x6h@cluster0.k2l4xfy.mongodb.net/?retryWrites=true&w=majority",
  connectionParams,
  (err) => {
    if (err) {
      throw new Error(`could not connect to mongodb: ${err}`);
    }
    console.log("Connected to MongoDB Successfully!");
  }
);

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
