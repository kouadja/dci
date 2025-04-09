
const multer = require('multer');

// Définir l'endroit où le fichier sera stocké
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
  }
});

// Filtrer les types de fichiers si nécessaire
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Types de fichiers autorisés
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Format de fichier non autorisé'), false); // Refuser le fichier
  }
};

// Créer un middleware multer
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
