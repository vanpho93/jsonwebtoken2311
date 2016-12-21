var {sign, decode, getNewToken} = require('../token.js');
module.exports = (req, res) => {
  var dec = decode(req.cookies.user_cookie);
  res.cookie('user_cookie',getNewToken(dec));
  res.render('giaodich');
};
