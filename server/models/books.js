/* 
File Name: server/models/books.js
Author's Name: Gaeun Kim
Student ID: 301157178
Web App Name: COMP229-F2021-MidTerm-301157178
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
