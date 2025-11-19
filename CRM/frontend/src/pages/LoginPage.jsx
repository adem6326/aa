import { useState } from "react";
import API from "../api.js";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      // Save token and user info
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Redirect to client page
      navigate("/clientpage", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
