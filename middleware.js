var {sign, decode, getNewToken} = require('./token.js');
module.exports = (req, res, next) => {
  var daDangNhap = false;
  var dec = decode(req.cookies.user_cookie);
  if(typeof dec == 'object'){
    daDangNhap = true;
  }

  if( (daDangNhap && req.path == '/giaodich') ||
      (!daDangNhap && req.path == '/dangnhap') ||
      req.path == '/xulydangnhap'){
    return next();
  }

  if(req.path == '/dangnhap'){
    return res.redirect('/giaodich')
  }

  res.redirect('/dangnhap');

};
