const {user, thought} = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        user.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
            });
    },

    // GET a single user
    getUserById(req, res) {
        user.findOne({_id: req.params.id})
        select ('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    
       