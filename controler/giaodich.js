var {sign, decode, getNewToken} = require('../token.js');
var {getUser} = require('../db.js');
var i = 1;
module.exports = (req, res) => {
  var dec = decode(req.cookies.user_cookie);
  getUser(dec.username,(err, user) => {
    console.log('i = ' + ++i);
    console.log(user);
    res.cookie('user_cookie',getNewToken(dec));
    res.render('giaodich', {user});
  });
};
