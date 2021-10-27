/* 
File Name: server/routes/index.js
Author's Name: Gaeun Kim
Student ID: 301157178
Web App Name: COMP229-F2021-MidTerm-301157178
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
