const likeComment = require("../Model/likeComment");
const { isAuth } = require("../Util/isAuth");
const Comment = require("../Model/comment");

exports.like = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  likeComment
    .findOne({ where: { user_id, comment_id: req.body.comment_id } })
    .then(async (data) => {
      if (!data) {
        const likeData = {
          user_id,
          video_id: req.params.id,
          comment_id: req.body.comment_id,
          status_like: true,
        };
        dataFromDB = await likeComment.create(likeData);
      } else {
        dataFromDB = await likeComment.update(
          { status_like: true },
          {
            where: { user_id, comment_id: req.body.comment_id },
          }
        );
      }
      const comment = await Comment.findOne({ where: { id: req.params.id } });
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(400).json({ error: err })
    });
};

exports.dislike = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  likeComment
    .findOne({ where: { user_id, comment_id: req.body.comment_id } })
    .then(async (data) => {
      if (!data) {
        const likeData = {
          user_id,
          video_id: req.params.id,
          comment_id: req.body.comment_id,
          status_like: false,
        };
        dataFromDB = await likeComment.create(likeData);
      } else {
        dataFromDB = await likeComment.update(
          { status_like: false },
          {
            where: { user_id, comment_id: req.body.comment_id },
          }
        );
      }
      const comment = await Comment.findOne({ where: { id: req.params.id } });
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
