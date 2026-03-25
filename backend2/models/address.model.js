import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phonenumber: {
      type: String,
      required: true,
    },

    building_name: {
      type: String,
      required: true,
    },

    road_name: {
      type: String,
      required: true,
    },

    near_by: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    pin: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const AddressModel = mongoose.model("Address", addressSchema);

