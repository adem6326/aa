const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

// Create a ticket
router.post("/", ticketController.createTicket);

// Get all tickets
router.get("/", ticketController.getTickets);

// Get one ticket by ID
router.get("/:id", ticketController.getTicketById);

// Update a ticket
router.put("/:id", ticketController.updateTicket);

// Delete a ticket
router.delete("/:id", ticketController.deleteTicket);

// Optional: Get tickets by order ID
router.get("/order/:orderId", async (req, res) => {
  try {
    const tickets = await ticketController.getTicketsByOrderId(req.params.orderId);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;