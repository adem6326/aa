import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./InvoiceForm.css";

function InvoiceForm() {
  const [form, setForm] = useState({
    invoiceNumber: "",
    totalAmount: "",
    status: "",
    dueDate: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await API.post("/invoices", form);
      setSuccessMessage("Invoice ajouté avec succès !");

      setForm({
        invoiceNumber: "",
        totalAmount: "",
        status: "",
        dueDate: ""
      });

      setTimeout(() => {
        navigate("/invoices");
        window.location.reload();
      }, 1000);

    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Erreur lors de l'ajout de la facture");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner invoice-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big invoice-avatar">#</div>
          <div>
            <h2>Add New Invoice</h2>
            <span className="client-role">Invoice Form</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={form.invoiceNumber}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={handleChange}
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Add</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceForm;
