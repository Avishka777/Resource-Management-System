const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    resourceName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    noOfResource: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sportsbooking = mongoose.model("Sportsbooking", resourceSchema);

module.exports = Sportsbooking;
