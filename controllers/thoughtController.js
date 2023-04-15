const {thought , user} = require('../models');

const thoughtController = {
    // GET all of the thoughts
    getAllThoughts(req, res) {
        thought.find()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch((err => {
            console.log(err);
            res.sendStatus(400);
        },
        );

    },

    // GET a single thought by id
    getThoughtById(req, res) {
        thought.findOne({ _id: req.params.id })
        .then(dbThoughtData => { res.json(dbThoughtData) })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

