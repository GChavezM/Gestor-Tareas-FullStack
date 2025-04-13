'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('Task', 'tasks_user_id_index', { transaction });
      await queryInterface.addIndex('Tasks', ['user_id'], {
        name: 'tasks_user_id_index',
        unique: false,
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('Task', 'tasks_user_id_index');
      await queryInterface.addIndex('Tasks', ['user_id'], {
        name: 'tasks_user_id_index',
        unique: true,
        transaction
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
