const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Vérifiez que le chemin est correct

// Affiche le formulaire d'inscription
router.get('/register', (req, res) => {
  res.render('register', { title: 'Inscription' });
});

// Traite le formulaire d'inscription
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/users/success'); // Assurez-vous d'avoir une route et une vue pour 'success'
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    res.status(500).render('register', { 
      title: 'Inscription',
      error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.'
    });
  }
});

module.exports = router;