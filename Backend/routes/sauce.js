const express = require('express');
const router = express.Router();


//////////////////// ROUTES SAUCES - ENREGISTREMENT DANS LA BASE DE DONNÉES ////////////////////

// Envoyer les sauces dans la base de données
router.post('/', sauceCtrl.createSauce);

// Mise à jour de la sauce grace à l'id fourni
router.put('/:id', sauceCtrl.modifySauce);

// Supprimer la sauce de la base de données
router.delete('/:id', sauceCtrl.deleteSauce);

// Tableaux des sauces
router.get('/', sauceCtrl.getAllSauces);

// Sauce unique - renvoie la sauce avec l'Id fournit
router.get('/:id', sauceCtrl.getOneSauce);

module.exports = router;