// Modifiez votre fichier models/fichier.js
module.exports = (sequelize, DataTypes) => {
  const Fichier = sequelize.define('Fichier', {
    type: {
      type: DataTypes.STRING(50), // Remplacer ENUM par STRING avec une longueur suffisante
      allowNull: false
    },
    // Ajouter un nouveau champ pour la catégorie
  
    chemin_fichier: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  // Relation avec le projet reste la même
  Fichier.associate = function(models) {
    Fichier.belongsTo(models.Projet, { foreignKey: 'projetId' });
  };
  
  return Fichier;
};