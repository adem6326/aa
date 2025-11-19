import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./InvoiceList.css";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/invoices")
      .then(res => setInvoices(res.data))
      .catch(err => console.error("Error fetching invoices:", err.response?.data || err.message));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper">
      <div className="detail-banner invoice-banner"></div>

      <div
        className="detail-card"
        style={{
          marginTop: "-80px",
          borderRadius: 0,
          width: "100vw",
          maxWidth: "100vw",
          padding: "20px",
        }}
      >
        <div className="detail-header">
          <div className="avatar-big invoice-avatar">📑</div>
          <div>
            <h2>Invoices</h2>
            <span className="client-role">Invoice Management</span>
          </div>
        </div>

        <div className="detail-actions" style={{ marginBottom: "10px" }}>
          <Link to="/invoices/new" className="btn btn-edit">Add Invoice</Link>
        </div>

        <div className="client-table-wrapper" style={{ width: "100%" }}>
          <table className="client-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Total</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv._id}>
                  <td>{inv.invoiceNumber}</td>
                  <td>{inv.client ? `${inv.client.nom} ${inv.client.prenom}` : "-"}</td>
                  <td>{inv.totalAmount} USD</td>
                  <td>{inv.status}</td>
                  <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}</td>
                  <td>
                    <Link to={`/invoices/${inv._id}`} className="btn btn-back">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
