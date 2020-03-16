const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../events/model");
const Ticket = require("../tickets/model");
const Comment = require("../comments/model");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "users"
  }
);

Ticket.belongsTo(User);
Event.belongsTo(User);
Comment.belongsTo(User);

module.exports = User;
