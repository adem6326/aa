const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, 
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
  subject: { type: String, required: true },//Title of the issue
  description: String,//Detailed explanation of the problem.
  status: { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },//Stage of the ticket:
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },//Stage of the ticket
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);