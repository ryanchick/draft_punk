'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stats = sequelize.define('Stats', {
    name: DataTypes.STRING,
    nba_id: DataTypes.INTEGER,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    position: DataTypes.STRING,
    min: DataTypes.FLOAT,
    pts: DataTypes.FLOAT,
    ast: DataTypes.FLOAT,
    reb: DataTypes.FLOAT,
    stl: DataTypes.FLOAT,
    blk: DataTypes.FLOAT,
    tov: DataTypes.FLOAT,
    fgm: DataTypes.FLOAT,
    fga: DataTypes.FLOAT,
    fg3m: DataTypes.FLOAT,
    fg3a: DataTypes.FLOAT,
    ftm: DataTypes.FLOAT,
    fta: DataTypes.FLOAT,
    dd2: DataTypes.INTEGER,
    td3: DataTypes.INTEGER,
    games_played: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Stats;
};