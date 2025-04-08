'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      type_projet: {
        type: Sequelize.ENUM('En Développement', 'En Création'),
        allowNull: false
      },
      forme_juridique: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('En cours d’examen', 'Validé', 'Rejeté'),
        defaultValue: 'En cours d’examen'
      },
      justification_rejet: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      promoteurId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Promoteurs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projets');
  }
};
