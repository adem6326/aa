import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./TicketEdit.css";

function TicketEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    client: "",
    order: "",
    product: "",
    subject: "",
    description: "",
    status: "open",
    priority: "medium"
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch ticket data
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await API.get(`/tickets/${id}`);
        setTicket(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error while loading the ticket.");
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  // Submit updated ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tickets/${id}`, ticket);
      navigate(`/tickets/${id}`); // go back to details page
    } catch (err) {
      console.error(err);
      setError("Error while updating the ticket.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h2>Edit Ticket Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            name="client"
            value={ticket.client}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Order ID:</label>
          <input
            type="text"
            name="order"
            value={ticket.order}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            name="product"
            value={ticket.product}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={ticket.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={ticket.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" value={ticket.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn">Save</button>
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TicketEdit;
