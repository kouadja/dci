const multer = require('multer');
const path = require('path');

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire où les fichiers seront stockés (assure-toi qu'il existe)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname); // Créer un nom de fichier unique
    cb(null, file.fieldname + '-' + uniqueSuffix); // Nom de fichier personnalisé
  }
});

// Filtrer les types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Type de fichier non autorisé'), false); // Rejeter le fichier
  }
};

// Initialiser multer avec la configuration
const upload = multer({ storage, fileFilter });

module.exports = {upload:upload};

