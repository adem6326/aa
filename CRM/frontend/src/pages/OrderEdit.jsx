import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "./OrderForm.css"; // reuse the same CSS for consistency

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch clients and products
    API.get("/clients").then(res => setClients(res.data));
    API.get("/products").then(res => setProducts(res.data));

    // Fetch the order details
    API.get(`/orders/${id}`)
      .then(res => {
        const order = res.data;
        setClientId(order.client?._id || "");
        setItems(order.items.map(i => ({
          product: i.product?._id || "",
          quantity: i.quantity
        })) || [{ product: "", quantity: 1 }]);
        setNotes(order.notes || "");
      })
      .catch(err => setErrorMessage(err.response?.data?.error || "Error fetching order"));
  }, [id]);

  const handleAddItem = () => setItems([...items, { product: "", quantity: 1 }]);
  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };
  const handleRemoveItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await API.put(`/orders/${id}`, { client: clientId, items, notes });
      navigate(`/orders/${id}`);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error updating order");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">✏️</div>
          <div>
            <h2>Edit Order</h2>
            <span className="client-role">Modify order details</span>
          </div>
        </div>

        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="order-form">
          {/* Client Selection */}
          <div className="form-group">
            <label>Client:</label>
            <select value={clientId} onChange={e => setClientId(e.target.value)} required>
              <option value="">-- Choose Client --</option>
              {clients.map(c => (
                <option key={c._id} value={c._id}>{c.nom} {c.prenom}</option>
              ))}
            </select>
          </div>

          {/* Order Items */}
          <h3>Items</h3>
          {items.map((item, idx) => (
            <div key={idx} className="item-row">
              <select
                value={item.product}
                onChange={e => handleChangeItem(idx, "product", e.target.value)}
                required
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
              <button type="button" className="btn btn-back" onClick={() => handleRemoveItem(idx)}>
                ❌
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-edit" onClick={handleAddItem}>
            ➕ Add Item
          </button>

          {/* Notes */}
          <div className="form-group">
            <label>Notes:</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-edit">✅ Save Changes</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(`/orders/${id}`)}>
              ⬅️ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderEdit;
