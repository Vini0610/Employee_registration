const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let employeeSchema = new Schema({
    id: {
        type: Number
    },
    firstName : {
        type: String
    },
    skill : {
        type: [String]
    },
    team : {
        type: String
    }
});

module.exports = employeeSchema;