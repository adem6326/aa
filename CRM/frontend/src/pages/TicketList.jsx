import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./TicketList.css";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/tickets")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">🎫</div>
          <div>
            <h2>Tickets</h2>
            <span className="client-role">Ticket Management</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/tickets/new" className="btn btn-edit">Add Ticket</Link>
        </div>

        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t._id}>
                  <td>{t.subject}</td>
                  <td>{t.status}</td>
                  <td>{t.priority}</td>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/tickets/${t._id}`} className="btn btn-back">Details</Link>
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

export default TicketList;
