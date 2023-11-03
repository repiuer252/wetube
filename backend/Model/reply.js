const Sequelize = require("sequelize");
const db = require("../Database/db");

const Reply = db.sequelize.define("reply", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comment_id: {
    type: Sequelize.INTEGER,
  },
  response_id: {
    type: Sequelize.INTEGER,
  },
  video_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Reply;
