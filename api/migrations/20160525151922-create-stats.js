'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      nba_id: {
        type: Sequelize.INTEGER
      },
      team: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      img_url: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      min: {
        type: Sequelize.FLOAT
      },
      pts: {
        type: Sequelize.FLOAT
      },
      ast: {
        type: Sequelize.FLOAT
      },
      reb: {
        type: Sequelize.FLOAT
      },
      stl: {
        type: Sequelize.FLOAT
      },
      blk: {
        type: Sequelize.FLOAT
      },
      tov: {
        type: Sequelize.FLOAT
      },
      fgm: {
        type: Sequelize.FLOAT
      },
      fga: {
        type: Sequelize.FLOAT
      },
      fg3m: {
        type: Sequelize.FLOAT
      },
      fg3a: {
        type: Sequelize.FLOAT
      },
      ftm: {
        type: Sequelize.FLOAT
      },
      fta: {
        type: Sequelize.FLOAT
      },
      dd2: {
        type: Sequelize.INTEGER
      },
      td3: {
        type: Sequelize.INTEGER
      },
      games_played: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Stats');
  }
};