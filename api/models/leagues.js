'use strict';
module.exports = function(sequelize, DataTypes) {
  var Leagues = sequelize.define('Leagues', {
    userId: DataTypes.INTEGER,
    userPosition: DataTypes.INTEGER,
    teams: DataTypes.ARRAY(DataTypes.JSON),
    draftedPlayers: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Leagues;
};