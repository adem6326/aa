import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./InvoiceDetail.css";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/invoices/${id}`);
        setInvoice(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleEdit = () => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Would you really delete this invoice ?")) {
      try {
        await API.delete(`/invoices/${id}`);
        navigate("/invoices");
      } catch (err) {
        console.error("Error deleting invoice:", err);
      }
    }
  };

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="detail-wrapper">
      {/* Decorative banner */}
      <div className="detail-banner"></div>

      {/* Main card */}
      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">
            📑
          </div>
          <div>
            <h2>Invoice #{invoice.invoiceNumber}</h2>
            <span className="client-role">Invoice Details</span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>👤 Client :</strong> {invoice.client?.name || "N/A"}</p>
          <p><strong>🛒 Order ID :</strong> {invoice.order?._id || "N/A"}</p>
          <p><strong>💰 Total :</strong> {invoice.totalAmount} USD</p>
          <p><strong>📌 Status :</strong> {invoice.status}</p>
          <p><strong>📅 Due Date :</strong> 
            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
          </p>
          <p><strong>🕒 Created At :</strong> 
            {new Date(invoice.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="detail-actions">
          <button className="btn btn-edit" onClick={handleEdit}> Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}> Delete</button>
          <button className="btn btn-back" onClick={() => navigate("/invoices")}>⬅️ Back</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
