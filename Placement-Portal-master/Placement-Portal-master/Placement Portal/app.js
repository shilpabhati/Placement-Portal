const express =require('express');
const app= express();
const morgan =require('morgan');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');

const studentRoutes = require('./api/routes/students');
const companyRoutes = require('./api/routes/companies');
const userRoutes = require('./api/routes/user');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
mongoose.connect(url, {useNewUrlParser:true})
  console.log("Connected correctly to server");





// mongoose.connect(mogodb)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=> {
	res.header("Access-Cotrol-Allow-Origin","*");
	res.header("Access-Cotrol-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method==='OPTIONS'){
		res.header("Access-Cotrol-Allow-Methods", 'PUT, POST, DELETE, GET');
		return res.status(200).json({});
}
  next();  
});

app.use('/companies', companyRoutes);
app.use('/students', studentRoutes);
app.use('/user', userRoutes);


app.use((req, res, next)=> {
	const error=new Error('Not found');
	error.status=404;
	next(error);

});

app.use((error,req, res, next)=> {
	res.status(error.status ||500);
	res.json({
		error: {
			message: error.message
		}
	})
	
});
module.exports = app;
