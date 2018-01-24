 'use strict'
const pgp = require('pg-promise')({

});
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'test_database',
    user: 'test_user',
    password: 'qwerty'
};


const db = pgp(cn);//process.env.DATABASE_URL)

 module.exports.test=function() {
 	//db.none('DROP TABLE cities');
 	db.none('CREATE TABLE cities(id SERIAL NOT NULL, cId INTEGER, cName TEXT,' +
             ' cCountry TEXT,' +
             ' lon FLOAT,'+
             ' lat FLOAT,' +
             ' temp FLOAT,' +
             ' windSpeed FLOAT,' +
             ' windDeg FLOAT,' +
             ' weatherMain TEXT,' +
             ' weatherIcon TEXT)'
         )
 	 }

 	 module.exports.db = db;