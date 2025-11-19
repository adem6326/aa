const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema(
{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
quantity: { type: Number, required: true, min: 1 },
priceAtOrder: { type: Number, required: false, min: 0 }, // prix figé au moment de la commande
label: { type: String }, // optionnel: nom/copie au moment T
},
{ _id: false }
);


const orderSchema = new mongoose.Schema(
{
client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
items: {
type: [orderItemSchema],
required: true,
validate: [arr => arr.length > 0, 'La commande doit contenir au moins un article']
},
total: { type: Number, required: true, min: 0 },
status: {
type: String,
enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
default: 'pending',
index: true,
},
notes: { type: String, default: '' },
invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }, // rempli après facturation
},
{ timestamps: true }
);


module.exports = mongoose.model('Order', orderSchema);