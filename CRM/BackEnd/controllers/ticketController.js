const Ticket = require("../models/ticket");
const Client = require("../models/client");
const Order = require("../models/order");
const Product = require("../models/product");

// Allowed enum values
const allowedStatuses = ["open", "in_progress", "resolved", "closed"];
const allowedPriorities = ["low", "medium", "high"];

// CREATE TICKET
exports.createTicket = async (req, res) => {
  try {
    const { client: clientId, order: orderId, product: productId, subject, status, priority, description } = req.body;

    // 1️⃣ Validate required fields
    if (!clientId) return res.status(400).json({ message: "Client is required" });
    if (!subject) return res.status(400).json({ message: "Subject is required" });

    // 2️⃣ Validate enums
    if (status && !allowedStatuses.includes(status)) 
      return res.status(400).json({ message: "Invalid status" });
    if (priority && !allowedPriorities.includes(priority)) 
      return res.status(400).json({ message: "Invalid priority" });

    // 3️⃣ Check references exist
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: "Client not found" });

    let order = null;
    if (orderId) {
      order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (order.client.toString() !== clientId) 
        return res.status(400).json({ message: "Order does not belong to this client" });
    }

    let product = null;
    if (productId) {
      product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
    }

    // 4️⃣ Create ticket
    const ticket = new Ticket({
      client: clientId,
      order: orderId,
      product: productId,
      subject,
      status: status || "open",
      priority: priority || "medium",
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ticket.save();

    // 5️⃣ Populate references for response
    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("client", "name email")
      .populate("order", "_id")
      .populate("product", "name");

    res.status(201).json(populatedTicket);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL TICKETS
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("client", "name email")
      .populate("order", "_id")
      .populate("product", "name");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE TICKET
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("client", "name email")
      .populate("order", "_id")
      .populate("product", "name");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TICKET
exports.updateTicket = async (req, res) => {
  try {
    const { client: clientId, order: orderId, product: productId, status, priority, subject, description } = req.body;

    // Validate enums
    if (status && !allowedStatuses.includes(status)) 
      return res.status(400).json({ message: "Invalid status" });
    if (priority && !allowedPriorities.includes(priority)) 
      return res.status(400).json({ message: "Invalid priority" });

    // Optional: validate client/order/product existence if updating
    if (clientId) {
      const client = await Client.findById(clientId);
      if (!client) return res.status(404).json({ message: "Client not found" });
    }

    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (clientId && order.client.toString() !== clientId)
        return res.status(400).json({ message: "Order does not belong to this client" });
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    )
      .populate("client", "name email")
      .populate("order", "_id")
      .populate("product", "name");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE TICKET
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};