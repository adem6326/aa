import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // axios instance
import "./TicketForm.css";

function TicketForm() {
  const [form, setForm] = useState({
    client: "",
    order: "",
    product: "",
    subject: "",
    description: "",
    status: "open",
    priority: "medium"
  });

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");     

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await API.post("/tickets", form);
      console.log(response.data);

      setSuccessMessage("Ticket added successfully!");

      // Reset form
      setForm({
        client: "",
        order: "",
        product: "",
        subject: "",
        description: "",
        status: "open",
        priority: "medium"
      });

      // Redirect to ticket list after 1 second
      setTimeout(() => {
        navigate("/tickets");
        window.location.reload(); 
      }, 1000);

    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.error || "Error while adding the ticket");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Ticket</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="client"
          placeholder="Client ID"
          value={form.client}
          onChange={handleChange}
          required
        />
        <input
          name="order"
          placeholder="Order ID"
          value={form.order}
          onChange={handleChange}
        />
        <input
          name="product"
          placeholder="Product ID"
          value={form.product}
          onChange={handleChange}
        />
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Ticket</button>
      </form>
    </div>
  );
}

export default TicketForm;
