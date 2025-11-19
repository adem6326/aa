import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./InteractionDetail.css";

function InteractionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interaction, setInteraction] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInteraction = async () => {
      try {
        const res = await API.get(`/interactions/${id}`);
        setInteraction(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'interaction.");
        setLoading(false);
      }
    };
    fetchInteraction();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette interaction ?")) {
      await API.delete(`/interactions/${id}`);
      navigate("/interactions");
    }
  };

  const handleEdit = () => navigate(`/interactions/${id}/edit`);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>
      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">{interaction.name_interaction?.[0]?.toUpperCase() || "C"}</div>
          <div>
            <h3>{interaction.name_interaction}</h3>
            <span className="client-role">{interaction.type}</span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>Email :</strong> <span>{interaction.client?.email || "-"}</span></p>
          <p><strong>Phone number :</strong> <span>{interaction.client?.num_tel || "-"}</span></p>
          <p><strong>Address :</strong> <span>{interaction.client?.adresse || "-"}</span></p>
          <p><strong>Start Date :</strong> <span>{new Date(interaction.start_date).toLocaleString()}</span></p>
          <p><strong>End Date :</strong> <span>{new Date(interaction.end_date).toLocaleString()}</span></p>
          <p><strong>Duration :</strong> <span>{interaction.duration}</span></p>
          <p><strong>Owner :</strong> <span>{interaction.owner}</span></p>
          <p><strong>Notes :</strong> <span>{interaction.notes}</span></p>
          <p><strong>Status :</strong> <span>{interaction.status}</span></p>
        </div>

        <div className="detail-actions">
          <button className="btn-edit" onClick={handleEdit}>Edit</button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
          <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default InteractionDetail;
