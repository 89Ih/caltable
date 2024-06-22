const { Schema, model } = require("mongoose");
const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
    },
    orders: {
      type: Array,
    },    
    tableNr: {
      type: String,
    },
    closed:{
      type:Boolean
    },
    sum:{
      type:Number
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", OrderSchema);

module.exports = Order;
