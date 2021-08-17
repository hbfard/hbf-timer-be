import mongoose from "mongoose";

const Schema = mongoose.Schema;
const activity = new Schema(
  {
    mac: {
      type: String,
    },
    savedSeconds: {
      type: Number,
    },
  },
  { collection: "activity" }
);

const Activities = mongoose.model("activities", activity);

export default Activities;
