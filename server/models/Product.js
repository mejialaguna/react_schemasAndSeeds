const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const imageSchema = require("./Image")
const reviewSchema = require('./Review')
const mongoose = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    rating: {
      type: Number,
      required: true,
      min: 0.99,
    },

    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 15,
    },
    images: [imageSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    reviews: [reviewSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ProductSchema.virtual("totalProducts").get(function () {
  return this.totalProducts.length;
})


const Product = model("Product", ProductSchema);
module.exports = Product;
