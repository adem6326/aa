import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import './ProductDetail.css'; // make sure this file has the client CSS styles

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/products/${id}`);
      navigate("/products");
    }
  };

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📦</div>
          <div>
            <h2>Product Details</h2>
            <span className="client-role">Product Info</span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </div>

        <div className="detail-actions">
          <button className="btn btn-edit" onClick={handleEdit}>Edit</button>
          <button className="btn btn-back" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
