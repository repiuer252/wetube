const Comment = require("../Model/comment");
const likeComment = require("../Model/likeComment");
const User = require("../Model/user");
const Reply = require("../Model/reply");
const { isAuth } = require("../Util/isAuth");

exports.register = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  const video_id = req.params.id;
  const commentData = {
    user_id,
    video_id,
    description: req.body.description,
  };
  Comment.create(commentData)
    .then((comment) => {
      const replyData = {
        video_id,
        comment_id: comment.dataValues.id,
      };
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

exports.index = (req, res) => {
  return Comment.findAll({ include: [{ model: User, as: "User" }] })
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

exports.reply = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  const video_id = req.params.id;
  const comment_id = req.body.comment_id;
  console.log(req.body);
  const commentData = {
    user_id,
    video_id,
    description: req.body.description,
    reply: true
  };
  Comment.create(commentData)
    .then((comment) => {
      const replyData = {
        video_id,
        comment_id,
        response_id: comment.dataValues.id,
      };
      Reply.create(replyData)
        .then((reply) => { })
        .catch((err) => {
          res.send("error : " + err);
        });
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

exports.getById = (req, res) => {
  const comment_id = req.params.id;
  return Reply.findAll({
    where: { comment_id },
    include: [
      {
        model: Comment,
        as: "Comment",
        include: [
          { model: likeComment, as: "likeComment" },
          { model: User, as: "User" },
        ],
      },
      {
        model: Comment,
        as: "Response",
        include: [
          { model: likeComment, as: "likeComment" },
          { model: User, as: "User" },
        ],
      },
    ],
  })
    .then(async (data) => {
      if (data.length > 0) {
        const { Comment, Response, comment_id, response_id, ...videoData } = data[0].dataValues;
        let countLikeResponse = 0;
        let countDislikeResponse = 0;
        let countLikeComment = 0;
        let countDislikeComment = 0;
        const result = data.reduce((acc, curr) => {
          const likeComment = curr.Response.dataValues.likeComment.reduce(
            (acc1, curr1) => {
              if (curr1.dataValues.status_like) {
                countLikeResponse = countLikeResponse + 1;
              } else {
                countDislikeResponse = countDislikeResponse + 1;
              }
              return { countLikeResponse, countDislikeResponse };
            },
            []
          );
          curr.Response.dataValues.likeComment = likeComment.countLikeComment || 0;
          curr.Response.dataValues.dislikeComment = likeComment.countDislikeComment || 0;
          acc.push(curr.Response.dataValues);
          countLikeComment = 0;
          countDislikeComment = 0;
          return acc;
        }, []);
        const likeComment = Comment.dataValues.likeComment.reduce(
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
        Comment.dataValues.likeComment = likeComment.countLikeComment || 0;
        Comment.dataValues.dislikeComment = likeComment.countDislikeComment || 0;
        videoData.Comment = Comment
        videoData.Response = result
        res.status(200).json({ data: videoData });
      } else {
        res.status(200).json({ data: {} });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};
