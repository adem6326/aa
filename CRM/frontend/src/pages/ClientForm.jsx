import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./ClientForm.css";

function ClientForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    num_tel: "",
    email: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await API.post("/clients", form);
      setSuccessMessage("Client ajouté avec succès !");

      setForm({
        nom: "",
        prenom: "",
        adresse: "",
        num_tel: "",
        email: ""
      });

      setTimeout(() => {
        navigate("/clients");
        window.location.reload();
      }, 1000);

    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Erreur lors de l'ajout du client");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">+</div>
          <div>
            <h2>Add New Client</h2>
            <span className="client-role">Client Form</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            name="nom"
            placeholder="Family Name"
            value={form.nom}
            onChange={handleChange}
            required
          />
          <input
            name="prenom"
            placeholder="Name"
            value={form.prenom}
            onChange={handleChange}
            required
          />
          <input
            name="adresse"
            placeholder="Address"
            value={form.adresse}
            onChange={handleChange}
            required
          />
          <input
            name="num_tel"
            placeholder="Phone Number"
            value={form.num_tel}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="detail-actions">
            <button type="submit" className="btn btn-edit">Add</button>
            <button type="button" className="btn btn-back" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientForm;
