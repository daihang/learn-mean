var express = require('express');
var mongoose = require('mongoose');

var db;
if (process.env.VCAP_SERVICES) {
   var env = JSON.parse(process.env.VCAP_SERVICES);
   db = mongoose.createConnection(env['mongodb-2.2'][0].credentials.url);
} else {
   db = mongoose.createConnection('localhost', 'track-cams-app');
}
//var db = mongoose.createConnection('localhost', 'track-cams-app');

var router = express.Router();

var ActivitySchema = require('../models/Activity.js').ActivitySchema;
var Activity = db.model('activities', ActivitySchema);

module.exports = router;

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title : 'Track My CAMS'
	});
});

// JSON API for list of activities
router.get('/activities/activities', function (req, res) {
	Activity.find({}, {}, function (error, activities) {
		res.json(activities);
	});
});

// JSON API for creating a new activity
router.post('/activities', function (req, res) {
	var reqBody = req.body,
	activityObj = {
		type : reqBody.type,
		description : reqBody.description
	};
	var activity = new Activity(activityObj);
	activity.save(function (err, doc) {
		if (err || !doc) {
			throw 'Error';
		} else {
			res.json(doc);
		}
	});
});