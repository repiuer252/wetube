const Sequelize = require("sequelize");
const db = require("../Database/db");

const watchLater = db.sequelize.define("watchlater", {
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

module.exports = watchLater;
