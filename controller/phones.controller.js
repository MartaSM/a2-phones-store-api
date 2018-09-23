const Phone = require('../models/phone.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
    Phone.find()
        .then(phones => {
            res.json(phones)
        })
        .catch(error => next(error));
};

module.exports.delete = (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
        .then(phone => {
            if(!phone){
                throw createError(404, 'Phone not found');
            } 
            res.status(204).json();
        })
        .catch(error => next(error));
};

