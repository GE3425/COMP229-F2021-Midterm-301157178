/* 
File Name: server/routes/books.js
Author's Name: Gaeun Kim
Student ID: 301157178
Web App Name: COMP229-F2021-MidTerm-301157178
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
      title: 'Books',
      books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newBook = book({
        "Title": "",
        "Description": "",
        "Price": "",
        "Author": "",
        "Genre": ""        
  });

    res.render('books/details', {title: 'Add a Book', books: newBook})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newFilledBook = book({
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre         
    });

    book.create(newFilledBook, (err, book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books')
        }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    book.findById(id, (err, bookToUpdate) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the details page
            res.render('books/details', {title: 'Edit a Book', books: bookToUpdate})
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id
    
    let editBook = book({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre    
    });
 
    book.updateOne({_id: id}, editBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refersh the book list
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/books');
        }
    });
});


module.exports = router;
