// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// Chargement des variables d'environnement depuis .env
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port (ici 5000 par défaut)
const PORT = 5000;

// Middleware pour autoriser les requêtes Cross-Origin (depuis React)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));



// Middleware pour parser les requêtes JSON entrantes
app.use(express.json());

// Connexion à MongoDB avec options recommandées
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,      // Nouveau parser pour URL MongoDB
  useUnifiedTopology: true    // Nouveau moteur de monitoring et découverte serveur
})
.then(() => console.log("Connexion à MongoDB réussie"))
.catch((err) => console.error("Erreur de connexion MongoDB :", err));

// Route principale de test
app.get('/', (req, res) => res.send('Mini CRM API is running'));

// Importation et utilisation des routes clients (CRUD)
app.use('/api/clients', require('./routes/clientRoute'));
// Importation et utilisation des routes interactions 
app.use('/api/interactions', require('./routes/interactionRoute'));
// Importation et utilisation des routes d'authentification
app.use("/api/auth", require("./routes/authRoute"));
// Importation et utilisation des routes orders (CRUD)
app.use('/api/orders', require('./routes/orderRoute'));
// Importation et utilisation des routes invoices (CRUD)
app.use('/api/invoices', require('./routes/invoiceRoute'));
// Importation et utilisation des routes products (CRUD)
app.use('/api/products', require('./routes/productRoute'));
// Importation et utilisation des routes tickets (CRUD)
app.use('/api/tickets', require('./routes/ticketRoute'));
// Démarrage du serveur sur le port défini
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

