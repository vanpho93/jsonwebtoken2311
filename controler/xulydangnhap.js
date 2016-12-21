var {checkLogin} = require('../db.js');
var {sign, decode, getNewToken} = require('../token.js');
module.exports = (req, res) => {
  var {username, password} = req.body;
  checkLogin(username, password, err => {
    if(err){
      return res.send('Dang nhap that bai ' + err);
    }
    res.cookie('user_cookie', sign({username, password}));
    res.redirect('/giaodich');
  });
};
