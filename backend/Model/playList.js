const Sequelize = require("sequelize");
const db = require("../Database/db");

const playList = db.sequelize.define("playlist", {
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
  category_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = playList;
