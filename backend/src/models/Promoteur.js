// src/models/promoteur.js
module.exports = (sequelize, DataTypes) => {
  const Promoteur = sequelize.define('Promoteur', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenoms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lieu_naissance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero_cni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  // Relation avec les projets (un promoteur peut avoir plusieurs projets)
  Promoteur.associate = function(models) {
    Promoteur.hasMany(models.Projet, { foreignKey: 'promoteurId' });
  };

  return Promoteur;
};
