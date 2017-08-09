const mongoose = require('mongoose');
//let log = require('./log')(module);
const config = require('./config');


mongoose.connect(config.get('mongoose:uri'));

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas

const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    createdOn: {type: Date, default: Date.now, required: false},
    updatedOn: {type: Date, default: Date.now, required: false},
    deletedOn: {type: Date, default: null, required: false},
    blocked: {type: Boolean, default: false, required: false},
    deleted: {type: Boolean, default: false, required: false},
    role: {type: String, required: false}
});

const UserModel = mongoose.model('user', User);


module.exports.UserModel = UserModel;