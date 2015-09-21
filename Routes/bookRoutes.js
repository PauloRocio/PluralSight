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
    })
.put(function(req,res){
        Book.findById(req.params.id, function(err,books){
            if(err) 
                res.status(500).send(err);
            else
                books.title     = req.body.title;
                books.author    = req.body.author;
                books.genre     = req.body.genre;
                books.read      = req.body.read;
                books.save();
                res.json(books);
        });
});
    return bookRouter;
};

module.exports = routes;