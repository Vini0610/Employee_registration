const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
    
});

module.exports = userSchema;