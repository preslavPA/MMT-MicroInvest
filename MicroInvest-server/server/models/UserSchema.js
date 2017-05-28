
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id : {
    type     : Number,
    required : true
  },
  company : {
    type : Array,
    required : false
  },
  details : {
    name : {
      type     : String,
      required : true
    },
    phone : {
      type : Number,
      required : true
    },
    address : {
      type : String,
      required : false
    },
    email : {
      type : String,
      required : true
    },
    country : {
      type : String,
      required: true
    }
  }
});

module.exports = UserSchema;