const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("wetube", "root", "", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
});
// console.log(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
