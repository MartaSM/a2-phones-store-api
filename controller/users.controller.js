const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


module.exports.create = (req, res, next) => {
    User.find( {email: req.body.email} )
    .then(user => {
        if(user) {
          console.log(`Body ${req.body.email}`)
            throw createError(409, `User with the email ${req.body.email} already exists`);
        } else {
            user = new User(req.body);
            return user.save()
        }
    })
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => next(error));
};


