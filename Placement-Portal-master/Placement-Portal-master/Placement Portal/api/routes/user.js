const express =require('express');
const mongoose = require('mongoose');
const router= express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

const User = require('../models/user');



router.post('/signup' , (req, res ,next) => 
{
	User.find({email: req.body.email})
	.exec()
	.then(user=> {
		if(user.length>=1){
			return res.status(500).json
			({
			    message:"mail already exist"
			});
		}
		else{
			    bcrypt.hash(req.body.password, 10, (err, hash)=>
	                {
		                if(err)
		                {
			                return res.status(500).json
			                ({
			                error:err
			                });
		     }
		else
		{
			const user = new User
			({
				_id: new mongoose.Types.ObjectId(),
				email : req.body.email, 
				//password : bcrypt.hashSync(req.body.password, salt);
				password : hash
			});
			user.save()
			.then(result => 
			{
				console.log(result);
				res.status(201).json
				({
					message: 'User created successfully'
				});

			})
			.catch(err => 
			{
				console.log(err);
	            res.status(500).json({error:err});

			});
	    }
	});

		}
	});
	
});


router.post('/:login' , (req, res ,next) => 
{
	User.find({ email: req.body.email })
	.exec()
	.then(result =>{
		if(result.length<1){
			return res.status(200).json({
				message: 'Please enter correct email or password'
			});
		}
		bcrypt.compare(req.body.password, result[0].password, (err, match)=>{
			if(err){
				    return res.status(200).json({
				    message: 'Please enter correct email or password'
			    });
			}
			if(match){
				const token= jwt.sign({
					email:result[0].email,
					userId: result[0]._id
				}, process.env.JWT_KEY,
				{
					expiresIn: "1h"
				});
				return res.status(200).json({
				    message: 'Logged In successfully',
				    token:token
			    });

			}
			res.status(200).json({
				    message: 'login failed'
			});
		})
		
	
	})
	.catch(err => {
		console.log(err);
	    res.status(500).json({error:err});
	});
});

module.exports = router;