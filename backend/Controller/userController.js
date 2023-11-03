const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const playList = require("../Model/playList");
const { isAuth } = require("../Util/isAuth");
const playListCategory = require("../Model/playListCategory");

process.env.SECRET_KEY = "secret";

exports.register = (req, res) => {
  if (req.body.username == "") {
    res.status(400).json({ error: "Username tidak boleh kosong" });
  } else if (req.body.password == "") {
    res.status(400).json({ error: "Password tidak boleh kosong" });
  } else if (req.body.email == "") {
    res.status(400).json({ error: "Email tidak boleh kosong" });
  } else if (req.body.gender == "") {
    res.status(400).json({ error: "Gender tidak boleh kosong" });
  } else if (req.body.birthday == "") {
    res.status(400).json({ error: "Birthday tidak boleh kosong" });
  }
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
  };

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.status(200).json({ error: "", data: "success" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.status(400).json({ error: "Username Sudah Ada" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

exports.login = (req, res) => {
  if (req.body.username == "") {
    res.status(400).json({ error: "Username tidak boleh kosong" });
  } else if (req.body.password == "") {
    res.status(400).json({ error: "Password tidak boleh kosong" });
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(
            { user_id: user.dataValues.id },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({ error: "", data: token });
        } else {
          res.status(401).json({ error: "Username dan Password Salah" });
        }
      } else {
        res.status(401).json({ error: "Username dan Password Salah" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Kesalahan pada server" });
    });
};

exports.find_one = (req, res) => {
  const { user_id } = isAuth((context = { req }));
  User.findOne({
    where: { id: user_id },
    include: [{ model: playListCategory, as: "playListCategory" }],
  })
    .then((data) => res.status(200).json({ error: "", data }))
    .catch((err) => {
      res.status(500).json({ error: "Kesalahan pada server" });
    });
};
