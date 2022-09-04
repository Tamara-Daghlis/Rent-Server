const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async function (request, response) {
  try {
    const { name, phone, email, password } = request.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new user({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    response.status(201).send(newUser);
  } catch (error) {
    response
      .status(404)
      .json({ messege: "Unsuccessful Registration", error: error });
  }
};

const getUsers = function (request, response) {
  user
    .find({})
    .then((users) => response.status(200).send(users))
    .populate("reviews")
    .catch((error) => response.status(404).json({ messege: error }));
};

const getUser = function (request, response) {
  const userId = request.params.id;
  user
    .find({ _id: userId })
    .then((user) => response.status(200).send(user))
    .populate("reviews")
    .catch((error) => response.status(404).json({ messege: error }));
};

const updateUser = async function (request, response) {
  try {
    const { name, phone, email, password } = request.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = request.params.id;

    const updatedUser = user.findByIdAndUpdate(userId, {
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
    });
    await save(updateUser);
    response.status(200).json({ messege: "User Updated" }).send(updatedUser);
  } catch (error) {
    response.status(404).json({ error: error });
  }
};

const deleteUser = function (request, response) {
  const userId = request.params.id;
  user
    .findOneAndDelete(userId)
    .then((deletedUser) =>
      response.status(200).json({ messege: "User Deleted" }).send(deletedUser)
    )
    .catch((error) => response.status(404).json({ messege: error }));
};

const login = async function (request, response) {
  const { email, password } = request.body;

  let userInfo = await user.find({ email });
  if (userInfo === null) {
    response.status(404).send("Connt find user");
  }
  bcrypt.compare(password, userInfo.password, function (error, result) {
    if (error) {
      response.json({ error: error });
    }
    if (result) {
      jwt.sign(user, process.env.ACCSEES_TOKEN_SECRET, (error, token) => {
        response.json({ token: token });
      });
    } else {
      return response.json({
        success: false,
        message: "passwords do not match",
      });
    }
  });
};

module.exports = {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
};
