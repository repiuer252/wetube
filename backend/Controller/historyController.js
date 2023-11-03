const history = require("../Model/history");
const { isAuth } = require("../Util/isAuth");
const Video = require("../Model/video");
const videoController = require("../Controller/videoController")
const User = require("../Model/user");

exports.add = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  history
    .findOne({
      where: {
        video_id: req.params.id,
        user_id
      },
    }).then(async (data) => {
      const videoResponse = await Video.findOne({ where: { id: req.params.id, user_id } })
      if (!data && !videoResponse) {
        const historyData = {
          user_id,
          video_id: req.params.id,
        };
        history
          .create(historyData)
          .then(async (data) => {
            await videoController.view(req.params.id)
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      }
      res.status(200).json({ data: "success" });
    }).catch(err => {
      res.status(400).json({ error: err });
    })
};

exports.remove = (req, res) => {
  isAuth((context = { req }));
  history
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(async (data) => {
      const { id } = data.dataValues;
      await history.destroy({ where: { id } });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.index = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  return history.findAll({ where: { user_id }, include: [{ model: Video, as: "Video", include: [{ model: User, as: "User" }] }] })
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