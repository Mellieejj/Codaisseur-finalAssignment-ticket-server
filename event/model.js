const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define(
  "event",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pictureUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startingDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

module.exports = Event;
