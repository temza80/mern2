var mongoose = require('mongoose');
// async=require('async');

//var crypto=require('crypto');

//var mongoose    = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/mydb');
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error!:' + err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas

//login
var cities = new Schema({

    cId: { type: Number, required: true },
    cName: { type: String, required: true },
    cCountry: { type: String, required: true },
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
    temp: { type: Number, required: true },
    wind: { type: [Number], required: true },
    weather: Schema.Types.Mixed,

    modified: { type: Date, default: Date.now }
});

var citiesModel = mongoose.model('cities', cities);

module.exports.citiesModel = citiesModel;