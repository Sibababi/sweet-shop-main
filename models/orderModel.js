const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {

    cart: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: {
          type: Number,
          required: [true, "A product must have a price"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A order must have a user"],
    },
    withDelivery: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: mongoose.Schema.ObjectId,
      ref: "Delivery",
      default: null,
    },
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      default: null,

      // required: [true, "restaurant must have a Location."],
    },
    priceExtesion: {
      type: Number,
      default: 0,
    },
    priceDelivery: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "A order must have a total"],
    },
    duration: {
      type: Number,
      required: [true, "A order must have a Duration"],
    },
    paidstatus: {
     ar:{type: String,
      required: true,
      enum: ["نقدي", "بنك", "سيريتل", "ام تي ان"],
      default: "نقدي",},
     en:{type: String,
      required: true,
      enum: ["CASH", "BANK", "SYRIATEL", "MTN"],
      default: "CASH",}
    },
    status: {
     ar:{ type: String,
      required: true,
      enum: ["تحضير", "توصيل", "مكتمل"],
      default: "تحضير",},
     en:{ type: String,
      required: true,
      enum: ["Preparation", "Delivery", "Completed"],
      default: "Preparation",}
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
