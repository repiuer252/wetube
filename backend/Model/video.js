const Sequelize = require("sequelize");
const db = require("../Database/db");
const Comment = require("./comment");
const History = require("./history");
const watchLater = require("./watchLater");
const playList = require("./playList");
const likeComment = require("./likeComment");
const likeVideo = require("./likeVideo");

const Video = db.sequelize.define("video", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  path: {
    type: Sequelize.STRING,
  },
  thumbnail: {
    type: Sequelize.STRING,
  },
  view: {
    type: Sequelize.INTEGER,
  },
});

// Comment
Video.hasMany(Comment, {
  as: "Comment",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
Comment.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

// History
Video.hasMany(History, {
  as: "History",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
History.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Playlist
Video.hasMany(playList, {
  as: "playList",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
playList.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Watch Later
Video.hasMany(watchLater, {
  as: "watchLater",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
watchLater.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Like Comment
Video.hasOne(likeComment, {
  as: "likeComment",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
likeComment.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

// Like Video
Video.hasMany(likeVideo, {
  as: "likeVideo",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});
likeVideo.belongsTo(Video, {
  as: "Video",
  foreignKey: "video_id",
  onDelete: "CASCADE",
  hooks: true,
});

module.exports = Video;
