import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./InteractionForm.css";

function InteractionForm() {
  const [form, setForm] = useState({
    name_interaction: "",
    type: "",
    start_date: "",
    end_date: "",
    duration: "",
    client: "",
    owner: "",
    notes: "",
    status: "pending",
  });

  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Load clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await API.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.error(err);
        setErrorMessage("Impossible de charger les clients");
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await API.post("/interactions", form);
      setSuccessMessage("Interaction ajoutée avec succès !");
      setForm({
        name_interaction: "",
        type: "",
        start_date: "",
        end_date: "",
        duration: "",
        client: "",
        owner: "",
        notes: "",
        status: "pending",
      });

      setTimeout(() => {
        navigate("/interactions");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">{form.name_interaction?.[0]?.toUpperCase() || "I"}</div>
          <div>
            <h2>{form.name_interaction || "New Interaction"}</h2>
            <span className="client-role">Interaction</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            name="name_interaction"
            placeholder="Interaction Name"
            value={form.name_interaction}
            onChange={handleChange}
            required
          />
          <input
            name="type"
            placeholder="Type"
            value={form.type}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
          <input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
          />
          <select name="client" value={form.client} onChange={handleChange} required>
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>
                {c.nom} {c.prenom}
              </option>
            ))}
          </select>
          <input
            name="owner"
            placeholder="Owner"
            value={form.owner}
            onChange={handleChange}
            required
          />
          <input
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Add</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InteractionForm;
