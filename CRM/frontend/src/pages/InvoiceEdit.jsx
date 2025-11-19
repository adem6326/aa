import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./InvoiceEdit.css";

function InvoiceEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    totalAmount: "",
    status: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await API.get(`/invoices/${id}`);
        setInvoice({
          invoiceNumber: res.data.invoiceNumber || "",
          totalAmount: res.data.totalAmount || "",
          status: res.data.status || "",
          dueDate: res.data.dueDate
            ? new Date(res.data.dueDate).toISOString().split("T")[0]
            : "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de la facture.");
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleChange = (e) =>
    setInvoice({ ...invoice, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/invoices/${id}`, invoice);
      navigate(`/invoices/${id}`);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour de la facture.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📑</div>
          <div>
            <h2>Invoice #{invoice.invoiceNumber}</h2>
            <span className="client-role">Invoice</span>
          </div>
        </div>

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            type="text"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleChange}
            placeholder="Invoice Number"
            required
          />
          <input
            type="number"
            name="totalAmount"
            value={invoice.totalAmount}
            onChange={handleChange}
            placeholder="Total Amount"
            required
          />
          <select
            name="status"
            value={invoice.status}
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
            value={invoice.dueDate}
            onChange={handleChange}
          />

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Save</button>
            <button
              type="button"
              className="btn btn-back"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceEdit;
