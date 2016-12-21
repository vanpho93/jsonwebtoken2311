var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());
var parser = require('body-parser').urlencoded({extended: false});
var {sign, decode, getNewToken} = require('./token.js');
var {checkLogin} = require('./db.js');
app.listen(3000, () => console.log('Server started'));

// app.get('/', (req, res) => {
//   res.cookie('username', 'Pho');
//   res.render('home')
// });
//
// app.get('/show', (req, res) => {
//   console.log(req.cookies);
//   res.send('Hello');
// });
//
// app.get('/muave', (req, res) => {
//   //Ban da mua ve
//   res.cookie('token', sign({damuave: true}));
//   res.send('Ban da mua ve');
// });
//
// app.get('/vaorap', (req, res) => {
//   //Neu chua mua ve -> Ban hay mua ve
//   //Neu mua ve roi -> Welcome
//   if(!req.cookies.token){
//     return res.send("Ban hay vua ve");
//   }
  // var dec = decode(req.cookies.token);
  // if(typeof dec == 'object'){
  //   res.cookie('token',getNewToken(dec));
  //   return res.send("Welcome");
  // }
//   res.send(dec);
// })
app.use((req, res, next) => {
  if(!req.cookies.user_cookie){
    return res.redirect("/dangnhap");
  }
  var dec = decode(req.cookies.user_cookie);
  if(typeof dec == 'object'){
    res.cookie('token',getNewToken(dec));
    res.redirect("/giaodich");
  }
  res.redirect("/dangnhap");
});
app.get('/dangnhap', (req, res) => res.render('dangnhap'));
app.get('/giaodich', (req, res) => res.render('giaodich'));
app.post('/xulydangnhap', parser, (req, res) => {
  var {username, password} = req.body;
  checkLogin(username, password, err => {
    if(err){
      return res.send('Dang nhap that bai ' + err);
    }
    res.cookie('user_cookie', sign({username, password}));
    res.redirect('/giaodich');
  })
});
