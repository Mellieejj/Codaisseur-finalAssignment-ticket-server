const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define(
  "event",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pictureUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    startingDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    tableName: "events"
  }
);

module.exports = Event;
