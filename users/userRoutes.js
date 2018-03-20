const express = require('express');
const User = require('./usersSchema');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('user routes working');
});

userRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user !== null) {
        user.comparePass(password, (err, match) => {
          if (err) {
            res.send(422).json({ err });
          }
          if (match) {
            const payload = {
              email: user.email,
              userId: user._id
            };
            console.log(user.id);
            res
              .status(200)
              .json({ token: jwt.sign(payload, secret), _id: user._id });
          } else {
            res.status(422).json({ error: 'email or password is not correct' });
          }
        });
      } else {
        res.status(422).json({ error: 'email or password is not correct' });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

userRouter.post('/new', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  if (!email) {
    res.status(422).json({ Error: 'Please include an email' });
  } else if (!password) {
    res.status(422).json({ Error: 'Please include a password' });
  } else {
    user
      .save()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error creating user' });
      });
  }
});

module.exports = userRouter;
