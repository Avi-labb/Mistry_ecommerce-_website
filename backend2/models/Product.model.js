import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    enum: ["Bags", "Clothing", "Accessories", "Clocks"]
  },

  images: {
    type:String
  },

  stock: {
    type: Number,
    default: 0
  },

  brand: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    default: 0
  },

  isSale: {
    type: Boolean,
    default: false
  },

  discountPercent: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export const ProductModel = mongoose.model("Product", productSchema);