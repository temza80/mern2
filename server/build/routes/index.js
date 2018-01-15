'use strict';

var express = require('express');
var router = express.Router();
//var request = require('request');
var cities = require("./city.list.json");
var countries = require("./countries.js");
var request = require('request-promise');
var Cities = require('./mongoose').citiesModel;
//console.log(cities.filter(x => x.name === 'Brest'))
/* GET home page. */
var renew = function () {

    Cities.find().then(citis => {
        console.log;
        var requests = [];
        citis.forEach(function (_item, i, arr) {
            requests.push(request("http://samples.openweathermap.org/data/2.5/weather?id=" + _item.id + "&appid=b6907d289e10d714a6e88b30761fae22"));
        });
        Promise.all(requests).then(results => {
            console.log(results);
            var saves = [];
            results.forEach(function (item_, i, arr) {

                var item = JSON.parse(item_);
                citis[i].cId = item.id, citis[i].cName = item.name, citis[i].cCountry = countries[item.sys.country], citis[i].lon = item.coord.lon, citis[i].lat = item.coord.lat, citis[i].temp = item.main.temp + Date.now();
                citis[i].wind = [item.wind.speed, item.wind.deg];
                citis[i].weather = { main: item.weather[0].main, icon: item.weather[0].icon };

                saves.push(citis[i].save());
            });
            Promise.all(saves);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};
router.get('/getall', function (req, res, next) {
    Cities.find().then(citis => {
        console.log(citis);res.json(citis);
    }).catch(err => console.log(err));
});
router.post('/lil', function (req, res, next) {
    var r = cities.filter(x => {
        if (x.name === req.body.param && x.name !== '') return true;
    });
    if (r.length) {
        console.log(r);res.json(r);
    } else res.json({ answer: "no" });
});

router.post('/putInBase', function (req, res, next) {

    var r = cities.filter(x => {
        if (x.id == req.body.param) return true;
    });
    console.log(req.body.param);
    /* var comment = new Comment({author:author_id,author_name:author_name,post_id:post_id,title: teasy(title), post: teasy(post)});
    comment.save(function (err) {*/
    if (r.length) {
        var reqStr = "http://samples.openweathermap.org/data/2.5/weather?id=" + req.body.param + "&appid=b6907d289e10d714a6e88b30761fae22";

        request(reqStr).then(function (presponse) {
            var response = JSON.parse(presponse);
            var city = new Cities({
                cId: response.id,
                cName: response.name,
                cCountry: countries[response.sys.country],
                lon: response.coord.lon,
                lat: response.coord.lat,
                temp: response.main.temp,
                wind: [response.wind.speed, response.wind.deg],
                weather: { main: response.weather[0].main, icon: response.weather[0].icon }
            });
            city.save().then(post => console.log(post)).catch(err => console.log(err));
        }).then(res.json("ok")).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;
module.exports.renew = renew;