const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

// CRUD factures
router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoiceById);
router.patch("/:id/pay", invoiceController.markAsPaid);

module.exports = router;
