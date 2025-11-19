import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import "./ClientDetail.css";

function ClientDetail() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await API.get(`/clients/${id}`);
        setClient(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Would you really delete this client ?")) {
      await API.delete(`/clients/${id}`);
      navigate("/clients");
    }
  };

  const handleEdit = () => {
    navigate(`/clients/${id}/edit`);
  };

  return (
    <div className="detail-wrapper">
      {/* Bannière */}
      <div className="detail-banner"></div>

      {/* Carte principale */}
      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">
            {client.nom?.[0]?.toUpperCase() || "C"}
          </div>
          <div>
            <h2>{client.prenom} {client.nom}</h2>
            <span className="client-role">Client </span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>📧 Email :</strong> {client.email}</p>
          <p><strong>📞 Phone number :</strong> {client.num_tel}</p>
          <p><strong>🏠 Adress :</strong> {client.adresse}</p>
        </div>

        <div className="detail-actions">
          <button className="btn btn-edit" onClick={handleEdit}> Edit</button>
          <button className="btn btn-delete" onClick={handleDelete}> Delete</button>
          <button className="btn btn-back" onClick={() => navigate("/clients")}>⬅️ Back</button>
        </div>
      </div>
    </div>
  );
}

export default ClientDetail;
