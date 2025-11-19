const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },//The selling price (per unit).
  sku: String, // Stock Keeping Unit (internal product code/ID).
  stock: Number, // How many units are available
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
