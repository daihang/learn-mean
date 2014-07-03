var mongoose = require('mongoose');
exports.ActivitySchema = new mongoose.Schema({
		type : {
			type : String,
			required : true
		},
		description : {
			type : String,
			required : true
		},
		time : {
			type : Date,
		default:
			Date.now
		}
	});
