// MEAN Stack RESTful API My Library
//L Gleed F00412036

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('booklist', ['booklist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/booklist', function (req, res) {
  console.log('I received a GET request');

  db.booklist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/booklist', function (req, res) {
  console.log(req.body);
  db.booklist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/booklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.booklist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/booklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.booklist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/booklist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.title);
  db.booklist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {title: req.body.title, genre: req.body.genre, author: req.body.author, isbn: req.body.isbn, price: req.body.price, borrower: req.body.borrower}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");