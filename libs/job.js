var parser = require('./parser');
var AWS = require('./AWS');
var async = require('async');
var db = require('../data/db.js');
var newChat = require("../models/newchat.js");
var dict = require('./dict');

function checkChanges() {
  return new Promise ((resolve, reject)=>{
    var files = [];
    var parsers = []
    for (var i = 1; i < 31; i++) {
      files.push(AWS.read('jobkg' + dict(i).branch + '.json'));
    }
    Promise.all(files).then((file_link)={
      for (var i = 1; i < 31; i++) {
        parsers.push(parser(dict(i).branch,1));
      }
      Promise.all(parsers).then((parser_link)=>{




      }).catch((error)=>{
        reject('Error parsing: ' + error);
      })
    }).catch((error)=>{
      reject('Error reading files: ' + error);
    })
  })
}