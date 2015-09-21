        var express = require('express');

        var routes = function(Book) {
            var bookRouter = express.Router();

            bookRouter.route('/books')
                .post(function(req, res) {
                    var book = new Book(req.body);

                    book.save();
                    res.status(201).send(book);
                })
                .get(function(req, res) {
                    var query = req.query;
                    Book.find(query, function(err, books) {
                        if (err)
                            res.status(500).send(err);
                        else
                            res.json(books);
                    });
                });

            bookRouter.use('/books/:id', function(req, res, next) {
                Book.findById(req.params.id, function(err, books) {
                    if (err)
                        res.status(500).send(err);
                    else if (books) {
                        req.book = books;
                        next();
                    } else {
                        res.status(404).send('no book found');
                    }
                });
            });

            bookRouter.route('/books/:id')
                .get(function(req, res) {
                    res.json(req.book);
                })
                .put(function(req, res) {
                    Book.findById(req.params.id, function(err, books) {
                        if (err)
                            res.status(500).send(err);
                        else
                            req.books.title = req.body.title;
                            req.books.author = req.body.author;
                            req.books.genre = req.body.genre;
                            req.books.read = req.body.read;
                            req.books.save(function(err) {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.json(req.books);
                            }
                        });
                    });
                })
                .patch(function(req, res) {
                    if (req.body._id) {
                        delete req.body._id;
                    }
                    for (var p in req.body) {
                        req.book[p] = req.body[p];
                    }
                    req.book.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(req.book);
                        }
                    });
                })
                .delete(function(req,res){
                    req.book.remove({_id: req.body.id}, function(err){
                       if(err){
                            res.status(500).send(err);
                       } else{
                            res.status(204).send('Removed');
                       }
                    });
                });
            return bookRouter;
        };

        module.exports = routes;