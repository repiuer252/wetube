const Sequelize = require("sequelize");
const db = require("../Database/db");
const playList = require('./playList')

const playListCategory = db.sequelize.define("playlistcategorys", {
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
});

// Playlist
playListCategory.hasMany(playList, { as: "playList", foreignKey: "category_id" });
playList.belongsTo(playListCategory, { as: "playListCategory", foreignKey: "category_id" });


module.exports = playListCategory;
