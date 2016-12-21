var {sign, decode, getNewToken} = require('../token.js');
var {getUser} = require('../db.js');

module.exports = (req, res) => {
  var dec = decode(req.cookies.user_cookie);
  getUser(dec.username,(err, user) => {
    console.log(user);
    res.cookie('user_cookie',getNewToken(dec));
    res.render('giaodich', {user});
  });
};
