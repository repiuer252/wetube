const Sequelize = require("sequelize");
const db = require("../Database/db");
const Video = require("./video");
const Comment = require("./comment");
const History = require("./history");
const watchLater = require("./watchLater");
const playList = require("./playList");
const likeComment = require("./likeComment");
const likeVideo = require("./likeVideo");
const playListCategory = require("./playListCategory");

const User = db.sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  birthday: {
    type: Sequelize.DATE,
  },
});

// Video
User.hasMany(Video, { as: "Video", foreignKey: "user_id" });
Video.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Comment
User.hasMany(Comment, { as: "Comment", foreignKey: "user_id" });
Comment.belongsTo(User, { as: "User", foreignKey: "user_id" });

// History
User.hasMany(History, { as: "History", foreignKey: "user_id" });
History.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Playlist
User.hasMany(playList, { as: "playList", foreignKey: "user_id" });
playList.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Playlist Category
User.hasMany(playListCategory, { as: "playListCategory", foreignKey: "user_id" });
playListCategory.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Watch Later
User.hasMany(watchLater, { as: "watchLater", foreignKey: "user_id" });
watchLater.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Like Image
User.hasOne(likeComment, { as: "likeComment", foreignKey: "user_id" });
likeComment.belongsTo(User, { as: "User", foreignKey: "user_id" });

// Like Video
User.hasOne(likeVideo, { as: "likeVideo", foreignKey: "user_id" });
likeVideo.belongsTo(User, { as: "User", foreignKey: "user_id" });


module.exports = User;
