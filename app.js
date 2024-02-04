require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Initialisation de l'application Express
const app = express();

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// BodyParser Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// BodyParser Middleware pour parser le corps des requêtes URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configuration pour servir des fichiers statiques (pour Bootstrap)
app.use(express.static('public'));

// Configuration du moteur de vue Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Définition des routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Inscription' });
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.redirect('/');
  });

// Importation des routes pour l'API utilisateur
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

module.exports = app;