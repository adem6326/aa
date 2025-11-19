import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [form, setForm] = useState({ nom: "", prenom: "", num_tel: "", email: "", password: "", role: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      alert("Registration successful!");
      // Automatically login after signup
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/clientpage", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input name="nom" placeholder="Family Name" onChange={handleChange} required />
        <input name="prenom" placeholder="First Name" onChange={handleChange} required />
        <input name="num_tel" placeholder="Phone Number" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input name="role" placeholder="Role" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
