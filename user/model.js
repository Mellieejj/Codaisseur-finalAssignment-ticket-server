const Sequelize = require("sequelize");
const db = require("../db");

const Event = require("../event/model");
const Ticket = require("../ticket/model");
const Comment = require("../comment/model");

const User = db.define(
  "user",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

Ticket.belongsTo(User);
Ticket.belongsTo(Event);

Event.belongsTo(User);

Comment.belongsTo(User);
Comment.belongsTo(Ticket);

Event.hasMany(Ticket);
Ticket.hasMany(Comment);

module.exports = User;
