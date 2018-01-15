var CronJob = require('cron').CronJob;
var renew = require('./index').renew;

module.exports.job = new CronJob('00 00,42 * * * *', function () {

    // console.log(new Date().getSeconds())
    renew();
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
}, function () {
    /* This function is executed when the job stops */
}, true, /* Start the job right now */
'America/Los_Angeles' /* Time zone of this job. */
);