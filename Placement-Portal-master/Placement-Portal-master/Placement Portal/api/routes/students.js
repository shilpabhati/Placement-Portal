const express =require('express');
const mongoose = require('mongoose');
const router= express.Router();
const Student = require('../models/student');
const checkAuth = require('../checkLogin/checkAuth');

router.get('/',(req, res, next) =>{
	Student.find()
	.select('name department rollno cgpa _id')
	.exec()
	.then(doc =>{
		//console.log(doc);
		const response ={
			//count:doc.length(),
			students: doc
		}
		res.status(200).json(response);
		
	})
	.catch(err=>{
	 console.log(err);
	res.status(500).json({error:err});
	});
});

router.post('/', (req, res, next) =>{
 	const student =new Student({
		_id: new mongoose.Types.ObjectId(),
		name : req.body.name, 
		rollno : req.body.rollno, 
		department : req.body.department,
		cgpa : req.body.cgpa
	});
	student.save().then(result=>{
		//console.log(result);
		res.status(201).json({
		message: 'Added new student',
		createdStudent: {
			name: result.name,
			//price: result.price
			rollno : result.rollno, 
		    department : result.department,
		    cgpa : result.cgpa
		}
	});
	})
	.catch(err=> {
		console.log(err);
		res.status(500).json({
			error: err
		});

	
});
	});

router.get('/:studentId',(req,res,next) => {
	const id = req.params.studentId;
	Student.findById(id)
	.select('name department rollno cgpa _id')
	.exec()
	.then(doc =>{
		console.log(doc);
		if(doc){
			res.status(200).json(doc);
		}else{
			res.status(404).json({message: 'No valid entry by id'});
		}
		
	})
	.catch(err=>{
	 console.log(err);
	res.status(500).json({error:err});
	});

});


router.patch('/:studentId',(req,res,next) => {
	const id= req.params.studentId;
	const updOps ={};
	for(const  op of req.body)
	{
		updOps[op.propName]=op.value
	}

	Student.update({ _id:id },{ $set: updOps})
	.exec()
	.then(result=> {
		console.log(result);
		res.status(200).json(result);
	})
	.catch(err=> {
		console.log(err);
		res.status(500).json({
			error:err
		});
	});

	});

router.delete('/:studentId',(req,res,next) => {
	const id= req.params.studentId;
	Student.remove({ _id:id 	})
	.exec()
	.then(result=> {
		res.status(200).json(result);
	})
	.catch(err=> {
		console.log(err);
		res.status(500).json({
			error:err
		});
	});

	});


module.exports = router;