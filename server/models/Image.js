const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reviewSchema = require("./Review");

const imageSchema = new Schema(
  {
    url: {
      type: String,
      unique: true,
      required: true,
    },
    reviews: [reviewSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

imageSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

module.exports = imageSchema;