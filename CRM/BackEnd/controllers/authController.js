const Utilisateur = require("../models/utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { nom, prenom, num_tel, email, password,role } = req.body;

    const existUtilisateur = await Utilisateur.findOne({ email });
    if (existUtilisateur) return res.status(400).json({ message: "Email déjà utilisé" });

    const utilisateur = await Utilisateur.create({ nom, prenom, num_tel, email, password, role });
    res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    const isMatch = await bcrypt.compare(password, utilisateur.password);
    if (!isMatch) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign({ id: utilisateur._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ message: "Connexion réussie", token, utilisateur });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
