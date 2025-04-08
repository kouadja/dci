'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Fichiers', 'type', {
      type: Sequelize.STRING(50),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Fichiers', 'type', {
      type: Sequelize.ENUM('plan_affaires', 'cni', 'identite'), // si tu veux rollback
      allowNull: false
    });
  }
};
