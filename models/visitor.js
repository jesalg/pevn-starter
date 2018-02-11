'use strict';
module.exports = (sequelize, DataTypes) => {
  var Visitor = sequelize.define('Visitor', {
    ip: DataTypes.STRING,
    user_agent: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Visitor;
};