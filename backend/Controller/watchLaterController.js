const User = require("../Model/user");
const Video = require("../Model/video");
const watchLater = require("../Model/watchLater");
const { isAuth } = require("../Util/isAuth");

exports.add = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  watchLater.findOne({ where: { user_id, video_id: req.params.id } })
    .then(async data => {
      const videoResponse = await Video.findOne({ where: { id: req.params.id, user_id } })
      if (!data && !videoResponse) {
        const watchLaterData = {
          user_id,
          video_id: req.params.id,
        };
        watchLater
          .create(watchLaterData)
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
  watchLater
    .findOne({
      where: {
        id: req.params.id,
        video_id: req.params.id,
      },
    })
    .then(async (data) => {
      const { id } = data.dataValues;
      await watchLater.destroy({ where: { id } });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.index = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  return watchLater
    .findAll({
      where: { user_id },
      include: [
        { model: Video, as: "Video", include: [{ model: User, as: "User" }] },
      ],
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

