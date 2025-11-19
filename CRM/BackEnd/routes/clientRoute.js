const express = require('express'); 
const router = express.Router(); // Create a router object for defining routes
const Client = require('../models/client'); // Import the Client model

//Add a new client
router.post('/', async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // <-- ajouté
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error); // <-- ajouté
    res.status(400).json({ error: error.message });
  }
});



//Update a client by ID
router.put('/:id', async (req, res) => {
  try {
    // Find client by ID and update with request body
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id, // ID from URL
      req.body,      // Updated data
      { new: true }  // Return the updated document
    );
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete a client by ID
router.delete('/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id); // Delete from MongoDB
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find(); // Fetch all clients from MongoDB
    res.json(clients); // Send them as JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
  }
});
//get a client by id
// Get a single client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router; // Export routes
