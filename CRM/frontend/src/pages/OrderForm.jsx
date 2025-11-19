import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./ClientForm.css"; // reuse the client form CSS

const OrderForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/clients").then(res => setClients(res.data));
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  const handleAddItem = () => setItems([...items, { product: "", quantity: 1 }]);
  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
  const handleRemoveItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await API.post("/orders", { client: clientId, items, notes });
      setSuccessMessage("Order created successfully!");
      setClientId("");
      setItems([{ product: "", quantity: 1 }]);
      setNotes("");
      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error creating order");
    }
  };

  // Check if any item has a product selected
  const disableClientSelect = items.some(item => item.product !== "");

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📦</div>
          <div>
            <h2>New Order</h2>
            <span className="client-role">Order Form</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          {/* Client Selection */}
          <select
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            required
            disabled={disableClientSelect} // disable if any item added
          >
            <option value="">-- Choose Client --</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>
                {c.nom} {c.prenom}
              </option>
            ))}
          </select>

          {/* Items */}
          {items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <select
                value={item.product}
                onChange={e => handleChangeItem(idx, "product", e.target.value)}
                required
                disabled={item.product !== ""} // disable if product is already selected
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e => handleChangeItem(idx, "quantity", e.target.value)}
              />
              <button type="button" className="btn btn-back" onClick={() => handleRemoveItem(idx)}>❌</button>
            </div>
          ))}
          <button type="button" className="btn btn-edit" onClick={handleAddItem}>➕ Add Item</button>

          {/* Notes */}
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          {/* Buttons */}
          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Add Order</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
