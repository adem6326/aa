import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./ClientList.css";

function ClientList() {
  const [clients, setClients] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/clients")
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients:", err.response?.data || err.message));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper" style={{ padding: 0, width: "100vw" }}>
      <div className="detail-banner"></div>

      <div className="detail-card" style={{ marginTop: "-80px", borderRadius: 0, width: "100vw", maxWidth: "100vw", padding: "20px" }}>
        <div className="detail-header">
          <div className="avatar-big">👥</div>
          <div>
            <h2>Clients</h2>
            <span className="client-role">Client Management</span>
          </div>
        </div>

        <div className="detail-actions" style={{ marginBottom: "10px" }}>
          <Link to="/clients/new" className="btn btn-edit">Add Client</Link>
        </div>

        <div className="client-table-wrapper" style={{ width: "100%" }}>
          <table className="client-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c._id}>
                  <td>{c.nom} {c.prenom}</td>
                  <td>{c.email}</td>
                  <td>{c.num_tel}</td>
                  <td>
                    <Link to={`/clients/${c._id}`} className="btn btn-back">Details</Link>
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

export default ClientList;
