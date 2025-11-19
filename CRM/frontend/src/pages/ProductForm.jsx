import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./ProductForm.css"; // new CSS file

function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    stock: ""
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
      await API.post("/products", form);
      setSuccessMessage("Product added successfully!");

      setForm({
        name: "",
        description: "",
        price: "",
        sku: "",
        stock: ""
      });

      setTimeout(() => {
        navigate("/products");
        window.location.reload();
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error while adding the product");
    }
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">+</div>
          <div>
            <h2>Add New Product</h2>
            <span className="client-role">Product Form</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            required
          />
          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
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

export default ProductForm;
