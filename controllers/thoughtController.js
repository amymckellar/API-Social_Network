const { thought, user } = require("../models");

const thoughtController = {
  // GET all of the thoughts
  getAllThoughts(req, res) {
    thought
      .find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single thought by id
  getThoughtById(req, res) {
    thought
      .findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // POST a new thought
  createThought(req, res) {
    thought
      .create(req.body)
      .then(async (dbThoughtData) => {
        const user = await user.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: dbThoughtData._id } }
        );
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // PUT to update a thought by id
  updateThought(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE to remove a thought by id
  deleteThought(req, res) {
    thought
      .findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // POST to add a reaction to a thought
  addReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE to remove a reaction from a thought
  removeReaction(req, res) {
    thought
      .findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      )

      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
