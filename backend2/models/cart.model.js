import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      price:{
        type:Number,
        required:true
      },
      quantity: {
        type: Number,
        default: 1
      },
    }
  ],

  

}, { timestamps: true });

export const CartModel = mongoose.model("Cart", cartSchema);