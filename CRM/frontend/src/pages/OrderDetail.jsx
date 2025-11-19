import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await API.delete(`/orders/${id}`);
        navigate("/orders");
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📦</div>
          <div>
            <h2>Order Details</h2>
            <span className="client-role">Order #{order._id}</span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>👤 Client:</strong> {order.client?.nom} {order.client?.prenom}</p>
          <p><strong>💰 Total:</strong> {order.total} €</p>
          <p><strong>📌 Status:</strong> {order.status}</p>
          <p><strong>📝 Notes:</strong> {order.notes || "-"}</p>
          <p><strong>📅 Created:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <h3>Items</h3>
        <ul>
          {order.items.map((item, i) => (
            <li key={i}>
              {item.product?.name} - {item.quantity} × {item.priceAtOrder} €
            </li>
          ))}
        </ul>

        <div className="detail-actions">
          <button className="btn btn-edit" onClick={() => navigate(`/orders/${id}/edit`)}> Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
          <button className="btn btn-back" onClick={() => navigate("/orders")}>⬅️ Back</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
