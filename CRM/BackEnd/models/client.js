const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },   // ajouté pour correspondre au formulaire
  email: { type: String, required: true },
  num_tel: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
