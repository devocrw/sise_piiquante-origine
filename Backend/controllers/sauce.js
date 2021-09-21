const Sauce = require('../models/sauce');
// fs permet d'intéragir avec les fichiers
const fs = require('fs');



//////////////////// CRÉATION DE LA SAUCE ////////////////////
exports.createSauce = (req, res, next) => {
    // Objet js sous forme de chaîne de caractères
    const sauceObject = JSON.parse(req.body.sauce);

    if (!sauceObject.name || !sauceObject.manufacturer || !sauceObject.description || !sauceObject.mainPepper) {
        return res.status(400).json({ error: 'Undefined n\'est pas une valeur valide' });
    };
    // Protection du formulaire avec un Regex pour interdire les caractères spéciaux
    if (sauceObject.name.match(regexForm) || sauceObject.manufacturer.match(regexForm) || sauceObject.description.match(regexForm) || sauceObject.mainPepper.match(regexForm)) {
        return res.status(400).json({ error: 'Les caractères spéciaux sont non autorisés !' });
    } else {
        // Sinon créer la sauce
        delete sauceObject._id;
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            
        });
        sauce.save()
            .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
            .catch(error => res.status(400).json({ error }));
    };
};

//////////////////// MODIFICATION DE LA SAUCE ////////////////////
exports.modifySauce = (req, res, next) => {
    // Si on trouve un fichier
    const sauceObject = req.file ?
        { // On récupère la chaîne de caractère
            ...JSON.parse(req.body.sauce),
            // et modifier image
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }; // Sinon on prend le corps de la requête

    if (!sauceObject.name || !sauceObject.manufacturer || !sauceObject.description || !sauceObject.mainPepper) {
        return res.status(400).json({ error: 'Undefined n\'est pas une valeur valide' });
    };
    // Protection du formulaire avec un Regex pour interdire les caractères spéciaux
    if (sauceObject.name.match(regexForm) || sauceObject.manufacturer.match(regexForm) || sauceObject.description.match(regexForm) || sauceObject.mainPepper.match(regexForm)) {
        return res.status(400).json({ error: 'Les caractères spéciaux sont non autorisés !' });
    } else {
        // Sinon modification de la sauce
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    };
};

//////////////////// SUPPRESSION DE LA SAUCE ////////////////////
exports.deleteSauce = (req, res, next) => {
    // Trouver l'objet dans la BDD
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Extraire nom du fichier à supprimer
            const filename = sauce.imageUrl.split('/images/')[1];
            // suppression du fichier dans la BDD et dans le dossier /images
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//////////////////// TABLEAUX DE TOUTES LES SAUCES ////////////////////
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//////////////////// RÉCUPÉRATION D'UNE SEULE SAUCE GRACE AU ID ////////////////////
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


        .catch((error) => res.status(400).json({ error }));
};