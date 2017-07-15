var parser = require('./parser');
var AWS = require('./AWS');
var async = require('async');
var db = require('../data/db.js');
var newChat = require("../models/newchat.js");
var dict = require('./dict');

module.exports = function () {
  return new Promise ((resolve, reject)=>{
    var files = [];
    var parsers = [];
    var tosend = [];
    var saves = [];
    for (var i = 1; i < 31; i++) {
      files.push(AWS.read('jobkg' + dict(i.toString()).branch + '.json'));
    }
    Promise.all(files).then((file_link)=>{
      console.log(file_link[0]);
      for (var i = 1; i < 31; i++) {
        parsers.push(parser(dict(i.toString()).branch,1));
      }
      Promise.all(parsers).then((parser_link)=>{




        for (var i = 0; i < 30; i++) {
          if (file_link[i].link!=parser_link[i][0].link) {
            console.log('new parser - ' + JSON.stringify(parser_link[0][0]));
            AWS.save('jobkg' + dict((i+1).toString()).branch + '.json', JSON.stringify(parser_link[i][0])).then((message)=>{
              console.log(message);
            }).catch((error)=>{
              console.log(error);;
            })
            tosend.push('jobkg' + dict((i+1).toString()).branch + '.json')
          }
        }
        resolve(tosend);

      }).catch((error)=>{
        reject('Error parsing1: ' + error);
      })
    }).catch((error)=>{
      reject('Error reading files: ' + error);
    })
  })
}
