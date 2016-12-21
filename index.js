var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());

app.listen(3000, () => console.log('Server started'));
app.get('/', (req, res) => {
  res.cookie('username', 'Pho');
  res.render('home')
});

app.get('/show', (req, res) => {
  console.log(req.cookies);
  res.send('Hello');
});
