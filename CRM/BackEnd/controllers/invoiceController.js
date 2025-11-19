const Invoice = require("../models/invoice");
const Order = require("../models/order");

//  Créer une facture à partir d’une commande
exports.createInvoice = async (req, res) => {
  try {
    const { orderId, dueDate } = req.body;
    const order = await Order.findById(orderId).populate("client");

    if (!order) return res.status(404).json({ error: "Commande introuvable" });

    // Vérifier si une facture existe déjà pour cette commande
    const existing = await Invoice.findOne({ order: orderId });
    if (existing) return res.status(400).json({ error: "Facture déjà créée pour cette commande" });

    const invoice = new Invoice({
      order: order._id,
      client: order.client._id,
      totalAmount: order.totalAmount,
      dueDate
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Récupérer toutes les factures
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("order client");
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Récupérer une seule facture
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("order client");
    if (!invoice) return res.status(404).json({ error: "Facture introuvable" });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Marquer une facture comme payée
exports.markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Facture introuvable" });

    invoice.status = "payée";
    await invoice.save();

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
