const Sequelize = require("sequelize");

const databaseURL = "postgres://postgres:final@localhost:5432/postgres";

const db = new Sequelize(databaseURL);

db.sync({ force: false })
  .then(() => console.log("database is connected"))
  .catch(console.error);

module.exports = db;
