const Video = require("../Model/video");
const { isAuth } = require("../Util/isAuth");
const cloudinary = require("cloudinary").v2;
const likeComment = require("../Model/likeComment");
const Comment = require("../Model/comment");
const likeVideo = require("../Model/likeVideo");
const User = require("../Model/user");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.upload = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  const video = req.files.video[0];
  const image = req.files.image[0];
  if (!video || !image) {
    res.status(400).json({ error: "File kosong" });
  }
  const videoData = {
    user_id,
    name: req.body.name,
    description: req.body.description,
    path: video.path,
    thumbnail: image.path,
  };
  Video.create(videoData)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.remove = (req, res) => {
  isAuth((context = { req }));
  Video.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(async (data) => {
      const { path, id } = data.dataValues;
      await Video.destroy({ where: { id } });
      const split = path.split("/");
      const temp = "Asset/" + split[split.length - 1].split(".")[0];
      cloudinary.api.delete_resources(
        temp,
        { resource_type: "video" },
        (error, result) => {
          res.status(200).json({ success: true, error, data: path });
        }
      );
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.findOne = (id) => {
  return Video.findOne({
    where: { id },
    include: [{ model: likeComment, as: "likeComment" }],
  })
    .then(async (data) => {
      const { likeComment, ...video } = data.dataValues;
      return { likeComment: likeComment.dataValues, video: video };
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.view = async (id) => {
  Video.increment({ view: +1 }, { where: { id } })
    .then(async () => {
      return { data: "success" };
    })
    .catch((err) => {
      return { error: err };
    });
};

exports.index = (req, res) => {
  return Video.findAll({ include: [{ model: User, as: "User" }] })
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

exports.getById = (req, res) => {
  const id = req.params.id;
  return Video.findOne({
    where: { id },
    include: [
      {
        model: Comment,
        as: "Comment",
        where: { reply: null },
        required: false,
        include: [
          { model: likeComment, as: "likeComment" },
          { model: User, as: "User" },
        ],
      },
      { model: likeVideo, as: "likeVideo" },
      { model: User, as: "User" },
    ],
  })
    .then(async (data) => {
      const { likeVideo, Comment, ...videoData } = data.dataValues;
      let countLikeComment = 0;
      let countDislikeComment = 0;
      let countLike = 0;
      let countDislike = 0;
      const result = Comment.reduce((acc, curr) => {
        const likeComment = curr.dataValues.likeComment.reduce(
          (acc1, curr1) => {
            if (curr1.dataValues.status_like) {
              countLikeComment = countLikeComment + 1;
            } else {
              countDislikeComment = countDislikeComment + 1;
            }
            return { countLikeComment, countDislikeComment };
          },
          []
        );
        curr.dataValues.likeComment = likeComment.countLikeComment || 0;
        curr.dataValues.dislikeComment = likeComment.countDislikeComment || 0;
        acc.push(curr.dataValues);
        countLikeComment = 0;
        countDislikeComment = 0;
        return acc;
      }, []);
      const likeVideoCount = likeVideo.reduce((acc, curr) => {
        if (curr.dataValues.status_like) {
          countLike = countLike + 1;
        } else {
          countDislike = countDislike + 1;
        }
        return { countLike, countDislike };
      }, []);
      videoData.comment = result;
      videoData.likeVideo = likeVideoCount.countLike || 0;
      videoData.dislikeVideo = likeVideoCount.countDislike || 0;
      res.status(200).json({ data: videoData });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ error: err });
    });
};

exports.getUploadedVideo = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  Video.findAll({ where: { user_id }, include: [{ model: User, as: "User" }] })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.search = (req, res) => {
  Video.findAll({
    where: { name: { [Op.like]: `%${req.body.name}%` } },
    include: [{ model: User, as: "User" }],
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.explore = (req, res) => {
  return Video.findAll({
    order: [["view", "DESC"]],
    include: [{ model: User, as: "User" }],
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
