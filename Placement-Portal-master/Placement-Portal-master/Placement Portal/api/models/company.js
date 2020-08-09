const mongoose = require('mongoose');
const companySchema= mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:String,
	profile: String,
	//studentRegistered : { type : Array , "default" : [] }
	studentRegistered: [{ studentId: 'string' }]


});

module.exports= mongoose.model('Company', companySchema);
