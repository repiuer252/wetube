const playList = require("../Model/playList");
const playListCategory = require("../Model/playListCategory");
const Video = require("../Model/video");
const User = require("../Model/user");
const { isAuth } = require("../Util/isAuth");

exports.createCategory = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  const playListCategoryData = {
    name: req.body.name,
    user_id
  };
  playListCategory
    .create(playListCategoryData)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.add = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  playList.findOne({
    where: {
      user_id,
      video_id: req.params.id,
      category_id: req.body.category_id,
    }
  }).then(async data => {
    const videoResponse = await Video.findOne({ where: { id: req.params.id, user_id } })
    if (!data && !videoResponse) {
      const playListData = {
        user_id,
        video_id: req.params.id,
        category_id: req.body.category_id,
      };
      playList
        .create(playListData)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
    res.status(200).json({ data: "success" })
  }).catch(err => res.status(400).json({ error: err }))
};

exports.remove = (req, res) => {
  isAuth((context = { req }));
  playList
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(async (data) => {
      const { id } = data.dataValues;
      await playList.destroy({ where: { id } });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.index = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  return playListCategory
    .findAll({
      where: { user_id },
      include: [{ model: playList, as: "playList", include: [{ model: Video, as: "Video", include: [{ model: User, as: "User" }] }] }],
    })
    .then((data) => {
      const result = data.reduce((acc, curr) => {
        acc.push(curr.dataValues);
        return acc;
      }, []);
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};