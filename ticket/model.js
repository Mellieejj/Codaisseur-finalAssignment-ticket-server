const Sequelize = require("sequelize");
const db = require("../db");

const Ticket = db.define("ticket", {
  pictureUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }, 
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  tableName: "tickets"
});

module.exports = Ticket;
