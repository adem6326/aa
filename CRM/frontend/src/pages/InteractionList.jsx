import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./InteractionList.css";

function InteractionList() {
  const [interactions, setInteractions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/interactions")
      .then(res => setInteractions(res.data))
      .catch(err => console.error("Error fetching interactions:", err.response?.data || err.message));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper" style={{ padding: 0, width: "100vw" }}>
      <div className="detail-banner"></div>

      <div className="detail-card" style={{ marginTop: "-80px", borderRadius: 0, width: "100vw", maxWidth: "100vw", padding: "20px" }}>
        <div className="detail-header">
          <div className="avatar-big">📊</div>
          <div>
            <h2>Interactions</h2>
            <span className="client-role">Interaction Management</span>
          </div>
        </div>

        <div className="detail-actions" style={{ marginBottom: "10px" }}>
          <Link to="/interactions/new" className="btn btn-edit">Add Interaction</Link>
        </div>

        <div className="client-table-wrapper" style={{ width: "100%" }}>
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Client</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {interactions.map(i => (
                <tr key={i._id}>
                  <td>{i.name_interaction}</td>
                  <td>{i.type}</td>
                  <td>{i.start_date ? new Date(i.start_date).toLocaleString() : "-"}</td>
                  <td>{i.end_date ? new Date(i.end_date).toLocaleString() : "-"}</td>
                  <td>{i.duration || "-"}</td>
                  <td>{i.client ? `${i.client.nom} ${i.client.prenom}` : "-"}</td>
                  <td>{i.owner}</td>
                  <td>{i.status || "-"}</td>
                  <td>
                    <Link to={`/interactions/${i._id}`} className="btn btn-back">Details</Link>
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

export default InteractionList;
