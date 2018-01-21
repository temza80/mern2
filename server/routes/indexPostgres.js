'use strict'
var express = require('express');
var router = express.Router();
//var request = require('request');
var cities=require("./city.list.json")
var countries=require("./countries.js")
var request = require('request-promise');
var db=require('./basaPostgres').db;

var renew= function()
{
db.tx(t => {
    return t.map('SELECT * FROM Cities', [], item => {
       return request("http://api.openweathermap.org/data/2.5/weather?id=" + item.cid + "&units=metric&appid=8d46bae5987203e7d1b4ee49408a9747")
    })
    .then(requests => Promise.all(requests))
    .then(data=> {
      
      return data.map(function(item_){
        var item=JSON.parse(item_);
      return t.none('UPDATE Cities SET cname = COALESCE($1,cname),'+
        'ccountry=COALESCE($2,ccountry), lon=COALESCE($3,lon), lat=COALESCE($4,lat),'+
        ' temp=COALESCE($5,temp), windspeed=COALESCE($6,windspeed), winddeg=COALESCE($7,winddeg),'+
        ' weathermain=COALESCE($8,weathermain), weathericon=COALESCE($9,weathericon)'+
      ' WHERE cId = $10', [item.name, countries[item.sys.country], item.coord.lat,
       item.coord.lat, item.main.temp, item.wind.speed, item.wind.deg,
        item.weather[0].main, item.weather[0].icon, item.id]);})
    })
    .then(t.batch);
    })
    .catch(error => {
       console.log(error)
    });
   
}
router.get('/getall', function(req, res, next)
{ 
  db.any('SELECT * FROM Cities').then(citis => {console.log(citis); if(citis.length) res.json(citis)}).catch(err => console.log(err))
    



})
router.post('/lil', function(req, res, next)
{
var r=cities.filter(x => { if(x.name === req.body.param && x.name!=='') return true} )
    if(r.length){ console.log(r); res.json(r);}
    else res.json({answer:"no"})


})

router.post('/putInBase', function(req, res, next)
{
  
  
  db.any('SELECT * FROM Cities WHERE cId=$1',[req.body.param]).then(result =>
   {
 
  if(result.length)res.json({resp:"exist"});
  else
  {


    var r=cities.filter(x => { if(x.id == req.body.param) return true} )
    console.log(req.body.param)
    /* var comment = new Comment({author:author_id,author_name:author_name,post_id:post_id,title: teasy(title), post: teasy(post)});
    comment.save(function (err) {*/
  if(r.length) {
      var reqStr = "http://api.openweathermap.org/data/2.5/weather?id=" + req.body.param + "&units=metric&appid=8d46bae5987203e7d1b4ee49408a9747"

      request(reqStr).then(presponse => {
        console.log(presponse);
        let response=JSON.parse(presponse);

     return db.one('INSERT INTO Cities(cId, cName, cCountry, lon, lat, temp, windSpeed, windDeg,weatherMain, weatherIcon)'+

            ' VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
            [response.id,response.name,countries[response.sys.country],
             response.coord.lon, response.coord.lat, response.main.temp,
              response.wind.speed, response.wind.deg, response.weather[0].main,
              response.weather[0].icon])


      }).then(id =>{ console.log(id); if(id) res.json({resp:"ok"})})
      

      .catch(err => {console.log(err)})
}
}
}).catch(err => {console.log(err)})
  })


module.exports = router;
module.exports.renew = renew;