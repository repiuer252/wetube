"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("replies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "comments",
          key: "id",
        },
      },
      response_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "comments",
          key: "id",
        },
      },
      video_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "videos",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("replies");
  },
};
