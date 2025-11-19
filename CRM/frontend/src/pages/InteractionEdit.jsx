import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./InteractionEdit.css";

function InteractionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await API.get("/clients");
        setClients(clientsRes.data);

        const interactionRes = await API.get(`/interactions/${id}`);
        setForm({
          ...interactionRes.data,
          start_date: interactionRes.data.start_date.slice(0, 16),
          end_date: interactionRes.data.end_date.slice(0, 16)
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'interaction.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/interactions/${id}`, form);
      navigate("/interactions");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour de l'interaction.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">
            {form.name_interaction?.[0]?.toUpperCase() || "I"}
          </div>
          <div>
            <h2>{form.name_interaction}</h2>
            <span className="client-role">Interaction</span>
          </div>
        </div>

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name_interaction"
            value={form.name_interaction}
            onChange={handleChange}
            placeholder="Interaction Name"
            required
          />
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type"
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
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration"
          />
          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            required
          >
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c._id} value={c._id}>
                {c.nom} {c.prenom}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="owner"
            value={form.owner}
            onChange={handleChange}
            placeholder="Owner"
            required
          />
          <input
            type="text"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Save</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InteractionEdit;
