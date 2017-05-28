
var restful = require('node-restful');
var mongoose = require('mongoose');
var UserSchema = require('../models/UserSchema');

module.exports = function (app, route) {

  var rest = restful.model(
    'user',
    app.models.user
  ).methods(['get', 'post']);

  rest.route('get', {
    details: true,
    handler: function (req, res, next) {
      var requestedEmail = req.query.email;
      var requestedId = req.query.id;
      var requestedIds = req.query.ids;
      console.log({'requestedEmail': requestedEmail});
      if (requestedEmail) {
        var UserModel = mongoose.model('User', UserSchema);
        console.log({'Search by EMAIL ongoing': requestedEmail});
        UserModel.find({'details.email': {$regex: ".*" + requestedEmail.toLowerCase() + ".*"}}, function (err, docs) {
          if (err) {
            res.send('ERROR WITH THE QUERY')
          }
          res.send(docs)
        });
      } else if (requestedId) {
        console.log({'Search by ID ongoing': requestedId})
        var UserModel = mongoose.model('User', UserSchema);
        UserModel.find({'id': requestedId}, function (err, docs) {
          if (err) {
            res.send('ERROR WITH THE QUERY')
          }
          res.send(docs)
        });
      }
      else if (requestedIds) {
        console.log({'Search by IDS ongoing': requestedIds})
        var UserModel = mongoose.model('User', UserSchema);
        UserModel.find({'id': {$in: requestedIds.split(',')}}, function (err, docs) {
          if (err) {
            res.send('ERROR WITH THE QUERY')
          }
          res.send(docs)
        });
      }
      else {
        var UserModel = mongoose.model('User', UserSchema);
        console.log('Search for all users ongoing')
        UserModel.find(function (err, docs) {
          if (err) {
            res.send('ERROR WITH THE QUERY')
          }
          res.send(docs)
        });
      }
    }
  });

  rest.route('post', {
    details:true,
    handler : function (req, res) {
      var reqBody = req.body;
      var UserModel = mongoose.model('User', UserSchema);
      var users = UserModel.find(function (err, users) {
        if (err) {
          return console.error(err);
        }
        users.sort(function (a, b) {
          return b.id - a.id
        });

        var newUserId;
        if (users.length == 0) {
          newUserId = 1;
        }
        else {
          newUserId = users[0].id + 1;
        }

        console.log('reqBody: ', reqBody);
        console.log('reqBody.company: ', reqBody.company);
        //reqBody = JSON.parse(Object.keys(reqBody)[0]);
        var newUser = new UserModel({
          id: newUserId,
          details: {
            name    : reqBody['details.name'],
            email   : reqBody['details.email'],
            address : reqBody['details.address'],
            country : reqBody['details.country'],
            company : reqBody.company,
            phone   : reqBody['details.phone']
          }
        });

        newUser.save(function (err) {
          console.log('kqlqlqlqlqlq');
          if (err) {
            console.log('errror', err);
            res.send('Error occurred while saving the new collaboration: ' + err)
          }
          else {
            console.log('hey you fuck.');
            res.send(newUser)
          }
        });
      });
    }
  });

  rest.register(app, route);

  return function (req, res, next) {
    next();
  };
};
