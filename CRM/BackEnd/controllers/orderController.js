const Order = require('../models/order');
const Product = require('../models/product');
const assert = require('assert');

// Création de commande = vérification stock + calcul total + décrémentation stock
exports.createOrder = async (req, res, next) => {
  try {
    const { client, items = [], notes = '' } = req.body;

    if (!client) {
      res.status(400);
      throw new Error('client est requis');
    }
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error('items est requis et non vide');
    }

    // Récupérer les produits et vérifier les stocks
    const productIds = items.map(i => i.product);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map(p => [String(p._id), p]));

    let total = 0;

    // Vérification stock et calcul total
    for (const it of items) {
      const p = productMap.get(String(it.product));
      if (!p) {
        res.status(400);
        throw new Error(`Produit ${it.product} introuvable`);
      }
      if (p.stock < it.quantity) {
        res.status(400);
        throw new Error(`Stock insuffisant pour le produit ${p.name}`);
      }
      total += p.price * it.quantity;
    }

    // Décrémenter le stock
    for (const it of items) {
      const p = productMap.get(String(it.product));
      p.stock -= it.quantity;
      await p.save();
    }

    // Créer la commande
    const order = new Order({
      client,
      items,
      total,
      notes,
      status: 'pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// GET /api/orders
exports.getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, client } = req.query;
    const q = {};
    if (status) q.status = status;
    if (client) q.client = client;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      Order.find(q)
        .populate('client')
        .populate('items.product')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(q),
    ]);

    res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client')
      .populate('items.product')
      .populate('invoice');

    assert(order, 'Commande introuvable');
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/orders/:id/status body: { status }
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    assert(allowed.includes(status), 'Statut invalide');

    const order = await Order.findById(req.params.id).populate('items.product');
    assert(order, 'Commande introuvable');

    // Si annulation et pas encore facturée → réapprovisionner
    if (status === 'cancelled' && !order.invoice) {
      for (const it of order.items) {
        const p = await Product.findById(it.product._id);
        p.stock += it.quantity;
        await p.save();
      }
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};
