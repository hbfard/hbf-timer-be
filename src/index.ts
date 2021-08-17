import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import useragent from "express-useragent";

import masterRouter from "./routers/index";

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(useragent.express());

app.use(function (req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
  next();
});

require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@hoomanonlinecluster.rve18.mongodb.net/hooman-online?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("mongoose is connected")
  );
} catch (error) {
  console.log("error: ", error);
}

app.use("/api", masterRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server: is running at https://localhost:${PORT}`);
});
