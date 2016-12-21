var jwt = require('jsonwebtoken');
var SECRET_KEY = 'ge5$8n3e28)&^ehdhgcdw233';

function sign(obj){
  return jwt.sign(obj, SECRET_KEY, {expiresIn: 3});
}

// function decode(en){
//   jwt.verify(en, SECRET_KEY, (err, decoded) => {
//     if(err) return console.log('Loi ' + err);
//     console.log(decoded);
//   });
//   console.log('abcd');
// }

function decode(en){
  try{
    return jwt.verify(en, SECRET_KEY);
  }catch(e){
    return 'Loi ' + e;
  }
}

var en = sign({name: 'Pho', age: 18});

// console.log('ENCODED: ', en);
