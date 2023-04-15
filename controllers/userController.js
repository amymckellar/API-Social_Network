const { user, thought } = require("../models");

const userController = {
  // GET all users
  getAllUsers(req, res) {
    user
      .find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single user
  getUserById(req, res) {
    user.findOne({ _id: req.params.id });
    select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // POST a new user to create a new one
  createUser(req, res) {
    user
      .create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // PUT to update a user by id
  updateUser(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove user by id
  deleteUser(req, res) {
    user
      .findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // POST to add a new friend
  addFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { friends: req.params.friendId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove a friend
  deleteFriend(req, res) {
    user
      .findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
