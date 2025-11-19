import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./ClientEdit.css";

function ClientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    nom: "",
    prenom: "",
    email: "",
    num_tel: "",
    adresse: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await API.get(`/clients/${id}`);
        setClient(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du client.");
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/clients/${id}`, client);
      navigate(`/clients/${id}`);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du client.");
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
            {client.nom?.[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <h2>{client.prenom} {client.nom}</h2>
            <span className="client-role">Client</span>
          </div>
        </div>

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            value={client.nom}
            onChange={handleChange}
            placeholder="Family Name"
            required
          />
          <input
            type="text"
            name="prenom"
            value={client.prenom}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="num_tel"
            value={client.num_tel}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="adresse"
            value={client.adresse}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Save</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientEdit;
