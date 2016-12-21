var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(cookieParser());
var parser = require('body-parser').urlencoded({extended: false});
app.listen(3000, () => console.log('Server started'));
app.use(require('./middleware.js'));
app.get('/dangnhap', require('./controler/dangnhap.js'));
app.get('/giaodich', require('./controler/giaodich.js'));
app.post('/xulydangnhap', parser, require('./controler/xulydangnhap.js'));

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
