'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Projets', 'titre');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Projets', 'titre', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
