const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const BadRequestError = require("../errors/BadRequestError");

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("Email already in use");
      }
    })
    .then(() => {
      bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({ name, email, password: hash }).then((user) =>
            res.send({ name, email: user.email })
          )
        );
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data sent to the server"));
      }
      return next(err);
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        token: jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "some-secret-key",
          { expiresIn: "7d" }
        ),
      })
    )
    .catch(() => next(new UnauthorizedError("Not authorized")));
};

module.exports = {
  getUser,
  createUser,
  signin,
};
