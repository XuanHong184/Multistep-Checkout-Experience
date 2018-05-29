var express = require('express');
var mysql = require('mysql');
var Promise = require('bluebird');

var app = express();

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'checkout'
});

dbConnection.connect(function(err) {
  if(err) throw err;
  console.log('Connected');
});

app.use('/', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.post('/users', function(req, res) {
  var data = '';
  req.on('data', function(chunk){
    data += chunk.toString();
  });
  req.on('end', function() {
    var userObj = JSON.parse(data);
    users.POST(userObj);
    res.statusCode = 201;
    res.type = 'text';
    res.end('Address Added to DB');
  });
});

app.post('/address', function(req, res) {
  var data = '';
  req.on('data', function(chunk){
    data += chunk.toString();
  });
  req.on('end', function() {
    var addressObj = JSON.parse(data);
    address.POST(addressObj);
    res.statusCode = 201;
    res.type = 'text';
    res.end('Card Added to DB');
  });
});

app.post('/cards', function(req, res) {
  var data = '';
  req.on('data', function(chunk){
    data += chunk.toString();
  });
  req.on('end', function() {
    var cardObj = JSON.parse(data);
    cards.POST(cardObj);
    res.statusCode = 201;
    res.type = 'text';
    res.end('User Added to DB');
  });
});

app.listen(process.env.PORT || 3000);

var users = {
  GET: function(username) {
    return new Promise(function(resolve, reject) {
      dbConnection.query('SELECT * FROM users WHERE username=?', [username], function(err, result) {
        if(err) {
          reject(err);
        } else {
          resolve(result)
        }
      });
    });
  },
  POST: function(userObj) {
    return new Promise(function(resolve, reject) {
      dbConnection.query('INSERT INTO users (username, password) values(?, ?)', [userObj.username, userObj.password], function(err, result) {
        if(err) {
          reject(err);
        } else {
          resolve('User Added To Table');
        }
      });
    });
  }
}

var address = {
  GET: function(username) {
    return users.GET(username)
    .then(function(data) {
      return new Promise(function(resolve, reject) {
        dbConnection.query('SELECT * FROM address WHERE user_id=?', [data[0].id], function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },
  POST: function(addressObj) {
    return users.GET(addressObj.username)
    .then(function(data) {
      return new Promise(function(resolve, reject) {
        dbConnection.query('INSERT INTO address (line1, line2, city, state, zip, user_id) values(?, ?, ?, ?, ?, ?)', [addressObj.line1, addressObj.line2, addressObj.city, addressObj.state, addressObj.zip, data[0].id], function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve('Address added to Table');
          }
        });
      });
    })
  }
}

var cards = {
  GET: function(username) {
    return users.GET(username)
    .then(function(data) {
      return new Promise(function(resolve, reject) {
        dbConnection.query('SELECT * FROM cards WHERE user_id=?', [data[0].id], function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  },
  POST: function(cardObj) {
    return users.GET(cardObj.username)
    .then(function(data) {
      return new Promise(function(resolve, reject) {
        dbConnection.query('INSERT INTO cards (number, expiry, cvv, zip, user_id) values(?, ?, ?, ?, ?)', [cardObj.number, cardObj.expiry, cardObj.cvv, cardObj.zip, data[0].id], function(err, result) {
          if(err) {
            reject(err);
          } else {
            resolve('Card added to Table');
          }
        });
      });
    })
  }
}

var sampleUser = {
  username: 'username1',
  password: 'password1'
}

var sampleAddress = {
  username: 'username1',
  line1: '1234 N Some St',
  line2: 'N/A',
  city: 'San Francisco',
  state: 'CA',
  zip: '94501'
}

var sampleCard = {
  username: 'username1',
  number: '1234567890',
  expiry: '01/23',
  cvv: '123',
  zip: '94501'
}

// cards.GET(sampleCard.username)
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(err) {
//   console.error(err);
// });
