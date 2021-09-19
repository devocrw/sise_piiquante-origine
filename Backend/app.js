const express = require('express');
const mongoose = require('mongoose');


const app = express();


const bodyParser = require("body-parser");

//////////////////// IMPORTATION DES ROUTES ////////////////////
const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

//////////////////// CONNEXION À MONGODB ////////////////////
mongoose
    .connect(
        "mongodb+srv://dbDev2:dbpasswordm@cluster0.s0zou.mongodb.net/MadbMongo?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//////////////////// CORS HEADERS - PERMET LA COMMUNICATION ENTRE LES LOCALHOST 3000/4200 ////////////////////
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//////////////////// LES ROUTES ////////////////////
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//////////////////// EXPORT APP SUR TOUTE L'APP ////////////////////
module.exports = app;