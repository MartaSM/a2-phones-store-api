const mongoose = require('mongoose');
const bcrypy = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified()){
        next();
    } else {
        bcrypy.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
               return bcrypy.hash(user.password, salt);
            })
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error));
    }
})


userSchema.methods.checkPassword = function(password) {
    return bcrypt (password, this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;