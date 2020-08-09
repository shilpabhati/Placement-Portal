const mongoose = require('mongoose');
const studentSchema= mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:String,
	department: String,
	rollno:Number,
	cgpa: Number
});

module.exports= mongoose.model('Student', studentSchema);
