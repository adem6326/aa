const Product = require("../models/product");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products); // Send them as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
};

// Get One Product
exports.getProductById = async (req, res) => {
    try{ 
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'product not found' });
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

// Update Product
exports.updateProduct = async (req, res) => {
     try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id, 
          req.body,      
          { new: true }  
        );
        res.json(updatedProduct);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};