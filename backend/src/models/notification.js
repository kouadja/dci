
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      statut: {
        type: DataTypes.ENUM('Envoyée', 'Non envoyée'),
        defaultValue: 'Non envoyée'
      },
      date_envoi: {
        type: DataTypes.DATE,
        allowNull: true
      }
    });
  
    // Relation avec le promoteur
    Notification.associate = function(models) {
      Notification.belongsTo(models.Promoteur, { foreignKey: 'promoteurId' });
    };
  
    return Notification;
  };

  