const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let guessingWords = words [Math.floor(Math.random() * words.length)];
let splitWord = guessingWords.split("");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public'));

app.use(session({
  secret: 'tROi$ e+ D3uX Et 1',
  resave: false,
  saveUninitialized: false
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set ('view engine', 'mustache');

app.get('/', function(req, res) {
  req.session.letterguest = guessingWords;
  console.log(req.session);
  res.render("index", {letter: splitWord});

  // randomWords();
  // console.log(guessingWords);
});
// let guessingWords;

//created a function to create random words
// function randomWords() {
// guessingWords = words [Math.floor(Math.random() * words.length)]
// };

app.post("/", function(req, res) {
  var formInput = req.body.guess;
  req.session.guess = formInput;
  res.redirect("/");
})


















app.listen(3000, function() {
  console.log("This one");
});
