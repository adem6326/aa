import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import './ProductEdit.css'; // styled like client form/edit

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    stock: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch product data
  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error while loading the product.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      await API.put(`/products/${id}`, product);
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => navigate(`/products/${id}`), 1000);
    } catch (err) {
      console.error(err);
      setError("Error while updating the product.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">✏️</div>
          <div>
            <h2>Edit Product</h2>
            <span className="client-role">Product Form</span>
          </div>
        </div>

        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form className="detail-info" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            name="sku"
            placeholder="SKU"
            value={product.sku}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
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

export default ProductEdit;
