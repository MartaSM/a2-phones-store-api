const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    passport.authenticate('local-auth', (error, user) => {
        if(error) {
            next(error);
        } else {
            req.login(user, (error) => {
                if(error) {
                    next(error);
                } else {
                    res.status(201).json();
                }
            })
        }
    }) (req, res, next);
}

module.exports.delete = (req, res, next) => {
    req.logout();
    req.status(204).json();
}