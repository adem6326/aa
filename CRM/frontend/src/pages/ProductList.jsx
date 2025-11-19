import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [location.pathname]);

  return (
    <div className="detail-wrapper">
      <div className="detail-banner"></div>

      <div className="detail-card">
        <div className="detail-header">
          <div className="avatar-big">📦</div>
          <div>
            <h2>Products</h2>
            <span className="client-role">Product Management</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link to="/products/new" className="btn btn-edit">Add Product</Link>
        </div>

        <div className="client-table-wrapper">
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <Link to={`/products/${p._id}`} className="btn btn-back">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;

