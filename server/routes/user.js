const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");
router.use(cors());

router.get("/test", (req, res) => {
  res.send("ed");
});

router.post("/register", (req, res) => {
  const userData = {
    user: req.body.user,
    email: req.body.email,
    password: req.body.password,
    date: new Date()
  };

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, (e, hash) => {
        userData.password = hash;
        User.create(userData)
          .then(user => {
            res.json({ status: user.email + " Registered" });
          })
          .catch(err => res.send("error" + err));
      });
    } else {
      res.json({ error: "User already exists" });
    }
  });
});
router.post("/login", (req, res) => {
  User.findOne({
    $or: [{ email: req.body.loginname }, { user: req.body.loginname }]
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id
          };
          let token = jwt.sign(payload, "zxc", {
            expiresIn: 1440
          });
          res.send({
            jwt: token,
            result: true
          });
        } else {
          // Passwords don't match
          res.send({ result: false });
        }
      } else {
        res.send({ result: false });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});
router.post("/auth", (req, res) => {
  let decoded;
  try {
    decoded = jwt.verify(req.headers["authorization"], "zxc");
  } catch (e) {
    res.send("error");
    console.error("error" + e);
    return;
  }

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json({ user: user.user, email: user.email });
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/oauth", async (req, res) => {
  console.log(req.body.code);
  await axios({
    method: "post",
    url: "https://github.com/login/oauth/access_token",
    data: {
      code: req.body.code,
      client_id: "1",
      client_secret: "11"
    }
  })
    .then(result => {
      res.send({
        source: "github",
        jwt: result.data.split("&")[0].split("=")[1]
      });
    })
    .catch(e => console.log(e));
});

router.get("/redirect", (req, res) => {
  res.redirect("https://www.baidu.com");
});

module.exports = router;
