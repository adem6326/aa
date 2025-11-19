import { Link, useNavigate } from "react-router-dom";
import "./ClientPage.css";

function ClientPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    localStorage.removeItem("user");      // clear user info
    sessionStorage.clear();
    navigate("/", { replace: true });      // prevent back button access
  };

  return (
    <div className="clientdash-wrapper">
      {/* Banner */}
      <div className="clientdash-banner">
        <h1>Dashboard</h1>
        <p>Manage your clients, interactions, tickets, products, orders, and invoices</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Cards */}
      <div className="clientdash-cards">
        <div className="clientdash-card">
          <div className="card-icon">👥</div>
          <h2>Clients</h2>
          <p>View, edit, and manage all your clients</p>
          <Link to="/clients" className="clientdash-btn">Go to Clients</Link>
        </div>

        <div className="clientdash-card">
          <div className="card-icon">💬</div>
          <h2>Interactions</h2>
          <p>Check and log all client interactions</p>
          <Link to="/interactions" className="clientdash-btn">Go to Interactions</Link>
        </div>

        <div className="clientdash-card">
          <div className="card-icon">🎫</div>
          <h2>Tickets</h2>
          <p>View and manage support tickets</p>
          <Link to="/tickets" className="clientdash-btn">Go to Tickets</Link>
        </div>

        <div className="clientdash-card">
          <div className="card-icon">📦</div>
          <h2>Products</h2>
          <p>Manage all your products</p>
          <Link to="/products" className="clientdash-btn">Go to Products</Link>
        </div>

        <div className="clientdash-card">
          <div className="card-icon">🛒</div>
          <h2>Orders</h2>
          <p>View and manage all orders</p>
          <Link to="/orders" className="clientdash-btn">Go to Orders</Link>
        </div>

        <div className="clientdash-card">
          <div className="card-icon">🧾</div>
          <h2>Invoices</h2>
          <p>View and manage all invoices</p>
          <Link to="/invoices" className="clientdash-btn">Go to Invoices</Link>
        </div>
      </div>
    </div>
  );
}

export default ClientPage;
