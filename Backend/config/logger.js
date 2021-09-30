const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Écrire tous les journaux de type `erreur` dans `error.log`.
    // - Ecriture de tous les journaux de type `info` dans le fichier `combined.log`.

    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});


// Si nous ne sommes pas en production, alors nous nous connectons à la `console` avec le format :
// `${info.level} : ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}