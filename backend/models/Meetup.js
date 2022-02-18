const mongoose = require("mongoose");
const { model, Schema, ObjectId } = mongoose;

const MeetupSchema = Schema(
  {
    date: {
      type: String,
    },
    hour: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    beers: {
      type: Number,
    },
    temp: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["INCOMING", "FINISHED", "CANCELLED"],
      default: "INCOMING",
    },
    description: {
      type: String,
      maxLength: 255,
    },
    address: {
      type: String,
      maxLength: 255,
    },
    invited: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    confirmed: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rejected: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Meetup", MeetupSchema);
