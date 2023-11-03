const Sequelize = require("sequelize");
const db = require("../Database/db");

const likeVideo = db.sequelize.define("likeVideo", {
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
  status_like: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = likeVideo;
