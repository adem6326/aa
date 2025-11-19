import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await API.get(`/tickets/${id}`);
        setTicket(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTicket();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      await API.delete(`/tickets/${id}`);
      navigate("/tickets");
    }
  };

  const handleEdit = () => {
    navigate(`/tickets/${id}/edit`);
  };

  return (
    <div className="container">
      <h2>Ticket Details</h2>
      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>

      {/* if you want to show references */}
      {ticket.client && <p><strong>Client:</strong> {ticket.client.name || ticket.client}</p>}
      {ticket.order && <p><strong>Order:</strong> {ticket.order._id || ticket.order}</p>}
      {ticket.product && <p><strong>Product:</strong> {ticket.product.name || ticket.product}</p>}

      <button className="btn" onClick={handleEdit}>Edit</button>
      <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TicketDetail;
