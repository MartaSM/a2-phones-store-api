const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: 'Brand is required'
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    image: {type: String},
    specs: {
        type: [String],
        default: []
    },
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Phone = mongoose.model('Phone', phoneSchema);
module.exports = Phone;