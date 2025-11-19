const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true }, 
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  totalAmount: { type: Number , required: true},
  status: { type: String, enum: ["impayed", "payed"], default: "impayée" },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

invoiceSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) { // safer check
    const year = new Date().getFullYear();
    const lastInvoice = await mongoose.model("Invoice").findOne().sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNum = parseInt(lastInvoice.invoiceNumber.split("-")[1]) || 0;
      nextNumber = lastNum + 1;
    }

    this.invoiceNumber = `${year}-${String(nextNumber).padStart(4, "0")}`;
  }
  next();
});




module.exports = mongoose.model("Invoice", invoiceSchema);