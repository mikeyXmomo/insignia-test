const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["UNPAID", "FULLY PAID"],
    required: true,
  },
  fulfillmentStatus: {
    type: String,
    enum: ["FULFILLED", "UNFULFILLED"],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

exports.Order = mongoose.model("order", orderSchema);
