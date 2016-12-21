var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  max: 100,
  idleTimeoutMillis: 1000
}

var pool = new pg.Pool(config);

var {encrypt, decrypt} = require('./crypto.js');

function queryDB(sql, cb){
  var loi, kq;
  pool.connect((err, client, done) => {
    if(err){
      loi = 'Loi ket noi :: ' + err;
      return cb(loi, kq);
    }
    done();
    client.query(sql, (err, result) => {
      if(err){
        loi = 'Loi truy van :: ' + err;
        return cb(loi, kq);
      }
      kq = result;
      cb(loi, kq);
    });
  });
}

function insertUser(username, password, phone, image, cb) {
  var loi;
  sql = `INSERT INTO "User"(username, password, phone, image)
        VALUES ('${username}', '${encrypt(password)}', '${phone}', '${image}')`;
  queryDB(sql, (err, result) => {
    if(err){
      loi = err;
      return cb(loi);
    }
    return cb(loi);
  });
}

function checkLogin(username, password, cb){
  var loi;
  var sql = `SELECT * FROM "User" WHERE username = '${username}'`;
  queryDB(sql, (err, result) => {
    if(err){
      loi = err;
      return cb(loi);
    }
    if(result.rows[0]){
      var dePass = decrypt(result.rows[0].password);
      if(password == dePass){
        return cb(loi);
      }
      loi = 'Sai password';
      return cb(loi);
    }
    loi = 'Username khong ton tai';
    cb(loi);
  });
}

function getUser(username, cb){
  var loi;
  var sql = `SELECT * FROM "User" WHERE username = '${username}'`;
  queryDB(sql, (err, result) => {
    if(err){
      loi = err;
      return cb(loi);
    }
    cb(loi, result.rows[0]);
  });
}

function checkUsernameExist(username, cb){
  var sql = `SELECT * FROM "User" WHERE username = '${username}'`;
  queryDB(sql, (err, result) => {
    if(err){
      return cb('Loi ' + err);
    }
    if(result.rows[0]){
      return cb('Username da ton tai');
    }
    cb(undefined);
  });
}

function updateUser(username, phone, image, password, cb){
  var sql = `UPDATE "User" SET phone='${phone}', password='${encrypt(password)}', image='${image}'
  WHERE username='${username}'`
  queryDB(sql, (err, result) => {
    cb(result);
  });
}

module.exports = {checkLogin, insertUser, checkUsernameExist, getUser, updateUser};
