const Sequelize = require("sequelize");
const db = require("../Database/db");
const likeComment = require("./likeComment");
const Reply = require("./reply");

const Comment = db.sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  video_id: {
    type: Sequelize.INTEGER,
  },
  reply: {
    type: Sequelize.BOOLEAN,
  },
});

// Like Comment
Comment.hasMany(likeComment, {
  as: "likeComment",
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  hooks: true,
});
likeComment.belongsTo(Comment, {
  as: "Comment",
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Comment
Comment.hasMany(Reply, {
  as: "Comment",
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  hooks: true,
});
Reply.belongsTo(Comment, {
  as: "Comment",
  foreignKey: "comment_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Response
Comment.hasMany(Reply, {
  as: "Response",
  foreignKey: "response_id",
  onDelete: "CASCADE",
  hooks: true,
});
Reply.belongsTo(Comment, {
  as: "Response",
  foreignKey: "response_id",
  onDelete: "CASCADE",
  hooks: true,
});

module.exports = Comment;
