import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./OrderList.css"; // reuse same CSS as ClientList

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/orders")
      .then(res => setOrders(res.data.items))
      .catch(err => console.error("Error fetching orders:", err.response?.data || err.message));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📦</div>
          <div>
            <h2>Orders</h2>
            <span className="client-role">Order Management</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/orders/new" className="btn btn-edit">➕ Add Order</Link>
        </div>

        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Total (€)</th>
                <th>Status</th>
                <th>Date</th>
                <th>Invoice</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.client ? `${order.client.nom} ${order.client.prenom}` : "-"}</td>
                  <td>{order.total?.toFixed(2) || "0.00"}</td>
                  <td>{order.status}</td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                  <td>{order.invoice ? "✔️ Linked" : "❌ No Invoice"}</td>
                  <td>
                    <Link to={`/orders/${order._id}`} className="btn btn-back">Details</Link>

                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
