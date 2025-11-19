const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  name_interaction: { type: String, required: true },
  type: { type: String, required: true },
  start_date:{type: Date, required: true},
  end_date:{type: Date, required: true},
  duration:{type:String},
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  owner:{type:String, required: true},
  notes: { type: String },          // optional field
  status: { type: String, default: "pending" } // optional field
  

}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);
