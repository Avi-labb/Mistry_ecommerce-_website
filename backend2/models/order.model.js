import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
  name: String,
  phonenumber: String,
  building_name: String,
  road_name: String,
  near_by: String,
  city: String,
  pin: String,
  state: String,
});

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name:String,
      quantity: Number,

      price: Number
    }
  ],

  address: addressSchema,

  paymentMethod: {
    type: String,
    enum:["cod","online"],
    default: "COD"
  },

  totalamount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    enum:["pending","Complete","failed"],
    default: "pending"
  },

  orderStatus: {
    type: String,
    enum:["placed","processing","shipped","delivered","cancelled"],
    default: false
  }

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);