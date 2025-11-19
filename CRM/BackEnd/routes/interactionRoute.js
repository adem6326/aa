const express = require('express'); 
const router = express.Router(); 
const Interaction = require('../models/interaction');

// Add a new interaction
router.post('/', async (req, res) => {
  try {
    const newInteraction = new Interaction(req.body);
    await newInteraction.save();
    res.status(201).json(newInteraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an interaction
router.put('/:id', async (req, res) => {
  try {
    const updatedInteraction = await Interaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInteraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an interaction
router.delete('/:id', async (req, res) => {
  try {
    await Interaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Interaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all interactions (populate client info)
router.get('/', async (req, res) => {
  try {
    const interactions = await Interaction.find().populate('client');
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one interaction
router.get('/:id', async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.params.id).populate('client');
    if (!interaction) return res.status(404).json({ error: "Interaction not found" });
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
