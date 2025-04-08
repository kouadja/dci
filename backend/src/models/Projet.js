// src/models/projet.js
module.exports = (sequelize, DataTypes) => {
    const Projet = sequelize.define('Projet', {
  
      type_projet: {
        type: DataTypes.ENUM('En Développement', 'En Création'),
        allowNull: false
      },
      forme_juridique: {
        type: DataTypes.STRING,
        allowNull: false
      },
      statut: {
        type: DataTypes.ENUM('En cours d’examen', 'Validé', 'Rejeté'),
        defaultValue: 'En cours d’examen'
      },
      justification_rejet: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });
  
    // Relation avec le promoteur
    Projet.associate = function(models) {
      Projet.belongsTo(models.Promoteur, { foreignKey: 'promoteurId', as: 'promoteur', });
      Projet.hasMany(models.Fichier, { foreignKey: 'projetId',as:"fichiers" });
    };
  
    return Projet;
  };

  