 const express =require('express');
 const router= express.Router();
 const mongoose = require('mongoose');
 const Company = require('../models/company');
 const checkAuth = require('../checkLogin/checkAuth');


router.get('/',(req, res, next) =>{
	Company.find()
	.select('name profile studentRegistered _id')
	.exec()
	.then(doc =>{
		//console.log(doc);
		const response ={
			//count:doc.length(),
			companies: doc
		}
		res.status(200).json(response);
		
	})
	.catch(err=>{
	 console.log(err);
	res.status(500).json({error:err});
	});
});

router.post('/', (req, res, next) =>{
 	const company =new Company({
		_id: new mongoose.Types.ObjectId(),
		name : req.body.name, 
		profile : req.body.profile
	});
	company.save().then(result=>{
		//console.log(result);
		res.status(201).json({
		message: 'Company added successfully',
		createdCompany: {
			name: result.name,
		    profile : result.profile
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

// router.get('/:companyId',(req,res,next) => {
// 	const id = req.params.companyId;
// 	Company.findById(id)
// 	.select('name profile _id')
// 	.exec()
// 	.then(doc =>{
// 		console.log(doc);
// 		if(doc){
// 			res.status(200).json(doc);
// 		}else{
// 			res.status(404).json({message: 'No valid entry by id'});
// 		}
		
// 	})
// 	.catch(err=>{
// 	 console.log(err);
// 	res.status(500).json({error:err});
// 	});

// });


router.patch('/:companyId',checkAuth , (req,res,next) => {
	const id= req.params.companyId;


	//const arr = Company.find(_id:id);
	Company.update({_id: id},
    {
    $push : {
            studentRegistered :  {
                 "studentId": req.body.newid
            } //inserted data is the object to be inserted 
    }
})
	.exec()
	.then(doc =>{
		console.log(doc);
		if(doc){
			res.status(200).json(doc);
		}else{
			res.status(404).json({message: 'Student registered in the company'});
		}
		
	})
	.catch(err=>{
	 console.log(err);
	res.status(500).json({error:err});
	});

	});

router.delete('/:companyId',(req,res,next) => {
	const id= req.params.companyId;
	Company.remove({ _id:id 	})
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