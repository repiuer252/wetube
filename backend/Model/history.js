const Sequelize = require("sequelize");
const db = require("../Database/db");

const History = db.sequelize.define("history", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  video_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = History;
