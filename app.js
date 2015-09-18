var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://127.0.0.1:27017/bookApi');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);



app.use('/api', bookRouter);
 
app.get('/',function(req,res){
    res.send('Welcome to API');
});

app.listen(port, function(){
    console.log('Running on port' + port);
});