var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();
    
    bookRouter.route('/')
       .post(function(req,res){
        var book = new Book(req.body);
    
        book.save();
        res.status(201).send(book);
    })
    .get(function(req,res){
        console.log('aqui');
        var query = req.query;
        Book.find(query,function(err,books){
            if(err) 
                res.status(500).send(err);
            else
                res.json(books);
        });
});

bookRouter.route('/books/:id')
    .get(function(req,res){
        Book.findById(req.params.id,function(err,books){
            if(err) 
                res.status(500).send(err);
            else
                res.json(books);
        });
    });
    return bookRouter;
};

module.exports = routes;