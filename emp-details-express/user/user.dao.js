const mongoose = require('mongoose');
let userSchema = require('./user.model');
const bcrypt = require("bcryptjs");

userSchema.statics = {
    create: function (data, cb) {
        this.findOne({ email: data.email }, (err, record) => {
            if (record) {
                cb("User already exists");
                return;
            }
            else {
                var user = new this(data);
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save(cb);
                    });
                });
            }
        });

    },
    get: function (query, cb) {
        this.find(query, cb);
    },
    getById: function (query, cb) {
        this.findOne(query, cb);
    },
    update: function (query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },
    delete: function (query, cb) {
        this.findOneAndDelete(query, cb);
    }
}

var userModel = mongoose.model('User', userSchema);
module.exports = userModel;